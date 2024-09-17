import { Image, Table, TableColumnsType, Typography } from "antd";
import { TableProps } from "antd/lib";
import { useNavigate, useSearchParams } from "react-router-dom";
import { productUrl } from "@/routes/urls";
import { addKeyField } from "@/utils/data";
import { IProductTable } from "@/modules/product/types";
import { useGetProducts } from "@/modules/product/apis/getProducts";

const { Text } = Typography;

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface TableProductProps {
    setProductsSelected: (vl: IProductTable[]) => void;
}

function TableProductInOrder({ setProductsSelected }: TableProductProps) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
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

    return (
        <div>
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

export default TableProductInOrder;
