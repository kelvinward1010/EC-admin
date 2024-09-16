import { Col, Flex, Form, Input, Row, Typography } from "antd";
import styles from "./Order.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import { addUserUrl } from "@/routes/urls";
import TableOrder from "../components/TableOrder";
import { IOrderTable } from "../types";

const { Text } = Typography;

export function Order() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [ordersSelected, setOrdersSelected] = useState<IOrderTable[]>([]);
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goAddNewOrder = () => navigate(addUserUrl);

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
                    <Text className={styles.label_main}>Order</Text>
                </Col>
                <Col span={7}>
                    <Form>
                        <Input.Search
                            onChange={(e) => handleChangeSearch(e.target.value)}
                            placeholder="Search name, phone, address..."
                        />
                    </Form>
                </Col>
            </Row>
            <div className={styles.table_wrapper}>
                <Flex gap={10} justify={"end"} align={"middle"}>
                    <ButtonConfig lable={"Add"} onClick={goAddNewOrder} />
                    <ButtonConfig
                        lable={"Delete"}
                        className={`${ordersSelected ? styles.deleted : styles.notdelected}`}
                    />
                </Flex>
                <TableOrder setOrdersSelected={setOrdersSelected} />
            </div>
        </div>
    );
}
