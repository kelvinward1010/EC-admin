import { Col, Flex, Form, Input, Radio, Row, Typography } from "antd";
import styles from "./User.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import { IUserTable } from "../types";
import TableUser from "../components/TableUser";
import { addUserUrl } from "@/routes/urls";
import type { RadioChangeEvent } from "antd";

const { Text } = Typography;

export function User() {
    const navigate = useNavigate();
    const [formsearchuser] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const [usersSelected, setUsersSelected] = useState<IUserTable[]>([]);
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [typeSearch, setTypeSearch] = useState(1);
    const formLabel = (value: string) => <Text strong>{value}</Text>;

    const goAddNewUser = () => navigate(addUserUrl);

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
            <Row justify={"space-between"} align={"top"}>
                <Col span={10}>
                    <Text className={styles.label_main}>User</Text>
                </Col>
                <Col span={7}>
                    <Form
                        form={formsearchuser}
                        name="formsearchuser"
                        scrollToFirstError
                        style={{ paddingBlock: 32, width: "100%" }}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        layout={"vertical"}
                    >
                        <Form.Item label={formLabel("Search")}>
                            <Radio.Group onChange={onChange} value={typeSearch}>
                                <Radio value={1}>name, email</Radio>
                                <Radio value={2}>ID</Radio>
                            </Radio.Group>
                            <Input.Search
                                onChange={(e) =>
                                    handleChangeSearch(e.target.value)
                                }
                                placeholder="Search name, email..."
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <div className={styles.table_wrapper}>
                <Flex gap={10} justify={"end"} align={"middle"}>
                    <ButtonConfig lable={"Add"} onClick={goAddNewUser} />
                    <ButtonConfig
                        lable={"Delete"}
                        className={`${usersSelected ? styles.deleted : styles.notdelected}`}
                    />
                </Flex>
                <TableUser
                    typeSearch={typeSearch}
                    setUsersSelected={setUsersSelected}
                />
            </div>
        </div>
    );
}
