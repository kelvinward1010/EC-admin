import { notification, Row, Table, TableColumnsType, Typography } from "antd";
import styles from "./TableOrder.module.scss";
import { TableProps } from "antd/lib";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ButtonConfig } from "@/components/buttonconfig";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { IOrderTable } from "../types";
import { IOrder } from "@/types/order";
import { useGetOrders } from "../apis/getOrders";
import { addKeyField } from "@/utils/data";
import { useDeleteOrder } from "../apis/deleteOrder";
import { queryClient } from "@/lib/react-query";
import { ModalSmall } from "@/components/modals/modalSmall";
import { orderUrl } from "../../../routes/urls";
const { Text } = Typography;

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface TableOrderProps {
    setOrdersSelected: (vl: IOrderTable[]) => void;
    typeSearch: number;
    statusValue: string;
    completedValue: boolean;
}

function TableOrder({
    setOrdersSelected,
    typeSearch,
    statusValue,
    completedValue,
}: TableOrderProps) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [order, setOrder] = useState<IOrder>();
    const pageIndex = Number(searchParams.get("pageIndex")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const searchContent = searchParams.get("searchContent") || "";

    const rowSelection: TableRowSelection<IOrderTable> = {
        onChange: (_, selectedRows) => {
            setOrdersSelected(selectedRows);
        },
        onSelectAll: (_, __, ___) => {},
    };

    const handleGoOrder = (id: string) => {
        navigate(`${orderUrl}/${id}`);
    };

    const columns: TableColumnsType<IOrderTable> = [
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
            title: "Payment Method",
            dataIndex: "paymentmethod",
            width: "auto",
        },
        {
            title: "ID user",
            dataIndex: "idUser",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Completed",
            dataIndex: "completed",
            render: (_: any, record: any) => {
                return <Text>{String(record?.completed)}</Text>;
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
                            onClick={() => handleGoOrder(record?._id)}
                        />
                        <ButtonConfig
                            icon={<DeleteFilled />}
                            onClick={() => {
                                setOrder(record);
                                setOpenModalDelete(true);
                            }}
                        />
                    </Row>
                );
            },
        },
    ];

    const { data, isLoading } = useGetOrders({
        data: {
            id: searchContent && typeSearch === 2 ? searchContent : "",
            idUser: searchContent && typeSearch === 1 ? searchContent : "",
            nameOrder: searchContent && typeSearch === 1 ? searchContent : "",
            completed:
                completedValue === false
                    ? false
                    : completedValue === true
                      ? true
                      : undefined,
            status: statusValue,
        },
        config: {},
    });

    const configDeleteOrder = useDeleteOrder({
        config: {
            onSuccess: () => {
                notification.success({
                    message: "Deleted order",
                });
                queryClient.invalidateQueries(["get-orders"]);
                setOpenModalDelete(false);
            },
            onError: (e) => {
                notification.error({
                    message: e?.response?.data?.detail,
                });
            },
        },
    });

    const handleDeleteOrder = () => {
        configDeleteOrder.mutate({ id: order?._id });
    };

    return (
        <div className={styles.container}>
            {openModalDelete && order?._id && (
                <ModalSmall
                    message={`Do you want to delete order of ${order?.deliveryaddress.name} !`}
                    open={openModalDelete}
                    setOpen={setOpenModalDelete}
                    onClick={handleDeleteOrder}
                    titleButton={"Delete"}
                />
            )}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                onRow={(record) => ({
                    onDoubleClick: () => handleGoOrder(record?.key),
                })}
                dataSource={addKeyField(data?.data?.items) ?? []}
                sticky
                size={"small"}
                scroll={{
                    y: 500,
                    x: 1300,
                }}
                className={"tablemain table_all"}
                pagination={{
                    total: data?.data?.items?.length,
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

export default TableOrder;
