import { Col, Flex, Form, Input, Radio, Row, Typography } from "antd";
import styles from "./Product.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import TableProduct from "../components/TableProduct";
import { IProductTable } from "../types";
import { addProductUrl } from "@/routes/urls";
import type { RadioChangeEvent } from "antd";

const { Text } = Typography;

export function Product() {
    const navigate = useNavigate();
    const [formsearchproduct] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const [productsSelected, setProductsSelected] = useState<IProductTable[]>(
        [],
    );
    const [typeSearch, setTypeSearch] = useState(1);
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const formLabel = (value: string) => <Text strong>{value}</Text>;

    const goAddNewProduct = () => navigate(addProductUrl);

    const handleChangeSearch = (value: string) => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            searchParams.set("searchContent", value.trim());
            searchParams.delete("pageIndex");
            searchParams.delete("pageSize");
            setSearchParams(searchParams);
        }, 1200);
    };

    const onChange = (e: RadioChangeEvent) => {
        setTypeSearch(e.target.value);
    };

    return (
        <div className={styles.container}>
            <Row justify={"space-between"} align={"middle"}>
                <Col span={10}>
                    <Text className={styles.label_main}>Product</Text>
                </Col>
                <Col span={7}>
                    <Form
                        form={formsearchproduct}
                        name="formsearchproduct"
                        scrollToFirstError
                        style={{ paddingBlock: 32, width: "100%" }}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        layout={"vertical"}
                    >
                        <Form.Item label={formLabel("Search")}>
                            <Radio.Group onChange={onChange} value={typeSearch}>
                                <Radio value={1}>name, type</Radio>
                                <Radio value={2}>ID</Radio>
                            </Radio.Group>
                            <Input.Search
                                onChange={(e) =>
                                    handleChangeSearch(e.target.value)
                                }
                                placeholder="Search name, type..."
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <div className={styles.table_wrapper}>
                <Flex gap={10} justify={"end"} align={"middle"}>
                    <ButtonConfig lable={"Add"} onClick={goAddNewProduct} />
                    <ButtonConfig
                        lable={"Delete"}
                        className={`${productsSelected ? styles.deleted : styles.notdelected}`}
                    />
                </Flex>
                <TableProduct
                    typeSearch={typeSearch}
                    setProductsSelected={setProductsSelected}
                />
            </div>
        </div>
    );
}
