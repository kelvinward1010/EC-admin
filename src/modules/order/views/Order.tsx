import { Col, Flex, Form, Input, Radio, Row, Select, Typography } from "antd";
import styles from "./Order.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import TableOrder from "../components/TableOrder";
import { IOrderTable } from "../types";
import { addOrderUrl } from "../../../routes/urls";
import type { RadioChangeEvent } from "antd";
import { STATUSORDER } from "@/constant/config";

const { Text } = Typography;

type FieldType = {
    status: string;
    completed: boolean;
};

export function Order() {
    const navigate = useNavigate();
    const [formsearchorder] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const [ordersSelected, setOrdersSelected] = useState<IOrderTable[]>([]);
    const [typeSearch, setTypeSearch] = useState(1);
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const formLabel = (value: string) => <Text strong>{value}</Text>;
    const statusValue = Form.useWatch("status", formsearchorder);
    const completedValue = Form.useWatch("completed", formsearchorder);
    const goAddNewOrder = () => navigate(addOrderUrl);

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
            <Text className={styles.label_main}>Order</Text>
            <Form
                form={formsearchorder}
                name="formsearchorder"
                scrollToFirstError
                style={{ paddingBlock: 32, width: "100%" }}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                layout={"vertical"}
            >
                <Row justify={"end"} align={"top"}>
                    <Col span={15}>
                        <Form.Item<FieldType>
                            label={formLabel("Status")}
                            name={"status"}
                        >
                            <Select
                                allowClear
                                placeholder="Select status"
                                style={{ width: "100%" }}
                                options={STATUSORDER}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={formLabel("Completed")}
                            name={"completed"}
                        >
                            <Radio.Group>
                                <Radio value={true}>True</Radio>
                                <Radio value={false}>False</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label={formLabel("Search")}>
                            <Radio.Group onChange={onChange} value={typeSearch}>
                                <Radio value={1}>name order, idUser</Radio>
                                <Radio value={2}>ID</Radio>
                            </Radio.Group>
                            <Input.Search
                                onChange={(e) =>
                                    handleChangeSearch(e.target.value)
                                }
                                placeholder="Search name order, idUser, id..."
                            />
                        </Form.Item>
                        <ButtonConfig
                            onClick={() => formsearchorder.resetFields()}
                            lable={"Clear search"}
                        />
                    </Col>
                </Row>
            </Form>

            <div className={styles.table_wrapper}>
                <Flex gap={10} justify={"end"} align={"middle"}>
                    <ButtonConfig lable={"Add"} onClick={goAddNewOrder} />
                    <ButtonConfig
                        lable={"Delete"}
                        className={`${ordersSelected ? styles.deleted : styles.notdelected}`}
                    />
                </Flex>
                <TableOrder
                    statusValue={statusValue}
                    completedValue={completedValue}
                    typeSearch={typeSearch}
                    setOrdersSelected={setOrdersSelected}
                />
            </div>
        </div>
    );
}
