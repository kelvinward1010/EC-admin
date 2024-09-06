import { Col, Flex, Form, Input, Row, Typography } from "antd";
import styles from "./Product.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import TableProduct from "../components/TableProduct";
import { IProductTable } from "../types";
import { addProductUrl } from "@/routes/urls";

const { Text } = Typography;

export function Product() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [usersSelected, setUsersSelected] = useState<IProductTable[]>([]);
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    return (
        <div className={styles.container}>
            <Row justify={"space-between"} align={"middle"}>
                <Col span={10}>
                    <Text className={styles.label_main}>Product</Text>
                </Col>
                <Col span={4}>
                    <Form>
                        <Input.Search
                            onChange={(e) => handleChangeSearch(e.target.value)}
                            placeholder="Search"
                        />
                    </Form>
                </Col>
            </Row>
            <div className={styles.table_wrapper}>
                <Flex gap={10} justify={"end"} align={"middle"}>
                    <ButtonConfig lable={"Add"} onClick={goAddNewProduct} />
                    <ButtonConfig
                        lable={"Delete"}
                        className={`${usersSelected ? styles.deleted : styles.notdelected}`}
                    />
                </Flex>
                <TableProduct setUsersSelected={setUsersSelected} />
            </div>
        </div>
    );
}
