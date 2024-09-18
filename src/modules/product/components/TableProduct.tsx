import {
    Image,
    notification,
    Row,
    Table,
    TableColumnsType,
    Typography,
} from "antd";
import styles from "./TableProduct.module.scss";
import { TableProps } from "antd/lib";
import { useNavigate, useSearchParams } from "react-router-dom";
import { productUrl } from "@/routes/urls";
import { IProductTable } from "../types";
import { useGetProducts } from "../apis/getProducts";
import { addKeyField } from "@/utils/data";
import { ButtonConfig } from "@/components/buttonconfig";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { IProduct } from "@/types/product";
import { ModalSmall } from "@/components/modals/modalSmall";
import { useDeleteProduct } from "../apis/deleteProduct";
import { queryClient } from "@/lib/react-query";

const { Text } = Typography;

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface TableProductProps {
    setProductsSelected: (vl: IProductTable[]) => void;
}

function TableProduct({ setProductsSelected }: TableProductProps) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [openModalDeleteProduct, setOpenModalDeleteProduct] =
        useState<boolean>(false);
    const [product, setProduct] = useState<IProduct>();
    const pageIndex = Number(searchParams.get("pageIndex")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const searchContent = searchParams.get("searchContent") || "";

    const rowSelection: TableRowSelection<IProductTable> = {
        onChange: (_, selectedRows) => {
            setProductsSelected(selectedRows);
        },
        onSelectAll: (_, __, ___) => {},
    };

    const handleGoProduct = (id: string) => {
        navigate(`${productUrl}/${id}`);
    };

    const columns: TableColumnsType<IProductTable> = [
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
            title: "Desciption",
            dataIndex: "description",
            render: (_: any, record: any) => {
                return (
                    <Text className={styles.textdescription}>
                        {record?.description}
                    </Text>
                );
            },
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Actions",
            width: "10%",
            render: (_: any, record: any) => {
                return (
                    <Row justify={"space-evenly"} key={record?._id}>
                        <ButtonConfig
                            icon={<EditFilled />}
                            onClick={() => handleGoProduct(record?._id)}
                        />
                        <ButtonConfig
                            icon={<DeleteFilled />}
                            onClick={() => {
                                setProduct(record);
                                setOpenModalDeleteProduct(true);
                            }}
                        />
                    </Row>
                );
            },
        },
    ];

    const { data, isLoading } = useGetProducts({
        data: {
            id: searchContent,
            name: searchContent,
            type: searchContent,
            page: pageIndex,
        },
        config: {},
    });

    const configDeleteUser = useDeleteProduct({
        config: {
            onSuccess: () => {
                notification.error({
                    message: "Deleted product",
                });
                queryClient.invalidateQueries(["get-products"]);
                setOpenModalDeleteProduct(false);
            },
            onError: (e) => {
                notification.error({
                    message: e?.response?.data?.detail,
                });
            },
        },
    });

    const handleDeleteProduct = () => {
        configDeleteUser.mutate({ id: product?._id });
    };

    return (
        <div className={styles.container}>
            {openModalDeleteProduct && product?._id && (
                <ModalSmall
                    message={`Do you want to delete ${product?.name} !`}
                    open={openModalDeleteProduct}
                    setOpen={setOpenModalDeleteProduct}
                    onClick={handleDeleteProduct}
                    titleButton={"Delete"}
                />
            )}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                onRow={(record) => ({
                    onDoubleClick: () => handleGoProduct(record?.key),
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
                    showTitle: true,
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

export default TableProduct;
