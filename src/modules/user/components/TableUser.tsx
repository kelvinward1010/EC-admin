import {
    Image,
    notification,
    Row,
    Table,
    TableColumnsType,
    Typography,
} from "antd";
import styles from "./TableUser.module.scss";
import { IUserTable } from "../types";
import { TableProps } from "antd/lib";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userUrl } from "@/routes/urls";
import { useGetUsers } from "../apis/getUsers";
import { addKeyField } from "@/utils/data";
import { ButtonConfig } from "@/components/buttonconfig";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { ModalSmall } from "@/components/modals/modalSmall";
import { IUser } from "@/types/user";
import { useDeleteUser } from "../apis/deleteUser";
import { queryClient } from "@/lib/react-query";

const { Text } = Typography;

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface TableUserProps {
    setUsersSelected: (vl: IUserTable[]) => void;
}

function TableUser({ setUsersSelected }: TableUserProps) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>();
    const pageIndex = Number(searchParams.get("pageIndex")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 20;
    const searchContent = searchParams.get("searchContent") || "";

    const rowSelection: TableRowSelection<IUserTable> = {
        onChange: (_, selectedRows) => {
            setUsersSelected(selectedRows);
        },
        onSelectAll: (_, __, ___) => {},
    };

    const handleGoUser = (id: string) => {
        navigate(`${userUrl}/${id}`);
    };

    const columns: TableColumnsType<IUserTable> = [
        {
            title: "STT",
            width: "5%",
            align: "center",
            render: (_, __, index) => <Text>{++index}</Text>,
        },
        {
            title: "ID",
            dataIndex: "_id",
            width: "18%",
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "auto",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "IsAdmin",
            dataIndex: "isAdmin",
            render: (_: any, record: any) => {
                return <Text>{String(record?.isAdmin)}</Text>;
            },
        },
        {
            title: "Image",
            dataIndex: "image",
            align: "center",
            render: (_: any, record: any) => {
                return <Image src={record?.image} />;
            },
        },
        {
            title: "Actions",
            width: "10%",
            render: (_: any, record: any) => {
                return (
                    <Row justify={"space-evenly"} key={record?._id}>
                        <ButtonConfig
                            icon={<EditFilled />}
                            onClick={() => handleGoUser(record?._id)}
                        />
                        <ButtonConfig
                            icon={<DeleteFilled />}
                            onClick={() => {
                                setUser(record);
                                setOpenModalDelete(true);
                            }}
                        />
                    </Row>
                );
            },
        },
    ];

    const { data, isLoading } = useGetUsers({
        data: {
            name: searchContent,
        },
        config: {},
    });

    const configDeleteUser = useDeleteUser({
        config: {
            onSuccess: () => {
                notification.error({
                    message: "Delete user",
                });
                queryClient.invalidateQueries(["get-users"]);
                setOpenModalDelete(false);
            },
            onError: (e) => {
                notification.error({
                    message: e?.response?.data?.detail,
                });
            },
        },
    });

    const handleDeletePost = () => {
        configDeleteUser.mutate({ id: user?._id });
    };

    return (
        <div className={styles.container}>
            {openModalDelete && user?._id && (
                <ModalSmall
                    message={`Do you want to delete ${user?.name} !`}
                    open={openModalDelete}
                    setOpen={setOpenModalDelete}
                    onClick={handleDeletePost}
                    titleButton={"Delete"}
                />
            )}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                onRow={(record) => ({
                    onDoubleClick: () => handleGoUser(record?.key),
                })}
                dataSource={addKeyField(data?.data) ?? []}
                sticky
                size={"small"}
                scroll={{
                    y: 450,
                    x: 1300,
                }}
                className={"tablemain table_all"}
                pagination={{
                    total: data?.data?.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `Total ${total} items`,
                    position: ["none", "bottomLeft"],
                    current: pageIndex,
                    pageSize,
                    onChange: (page, pageSize) => {
                        searchParams.set("pageIndex", String(page));
                        searchParams.set("pageSize", String(pageSize));
                        setSearchParams(searchParams);
                    },
                }}
                loading={isLoading}
            />
        </div>
    );
}

export default TableUser;
