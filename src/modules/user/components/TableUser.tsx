import { Table, TableColumnsType } from "antd";
import styles from "./TableUser.module.scss";
import { IUserTable } from "../types";
import { TableProps } from "antd/lib";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { productUrl } from "@/routes/urls";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

const columns: TableColumnsType<IUserTable> = [
    {
        title: "STT",
        width: "5%",
    },
    {
        title: "ID",
        dataIndex: "_id",
        width: "18%",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Actions",
        width: "10%",
    },
];

interface TableUserProps {
    setUsersSelected: (vl: IUserTable[]) => void;
}

function TableUser({ setUsersSelected }: TableUserProps) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = Number(searchParams.get("pageIndex")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 20;
    const searchContent = searchParams.get("searchContent") || "";
    const [data, setData] = useState<IUserTable[]>([]);

    const rowSelection: TableRowSelection<IUserTable> = {
        onChange: (_, selectedRows) => {
            setUsersSelected(selectedRows);
        },
        onSelectAll: (_, __, ___) => {},
    };

    const handleGoEmployee = (id: string) => {
        navigate(`${productUrl}/${id}`);
    };

    return (
        <div className={styles.container}>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                onRow={(record) => ({
                    onDoubleClick: () => handleGoEmployee(record?.key),
                })}
                dataSource={data}
                sticky
                size={"small"}
                scroll={{
                    y: 450,
                    x: 1300,
                }}
                className={"tablemain table_all"}
                pagination={{
                    total: data.length,
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
                loading={false}
            />
        </div>
    );
}

export default TableUser;
