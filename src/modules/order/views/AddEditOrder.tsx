import { Flex, Form, Input, Radio, Typography } from "antd";
import styles from "./AddEditProduct.module.scss";
import { useCallback } from "react";
import { ButtonConfig } from "@/components/buttonconfig";

const { Text } = Typography;

type FieldType = {
    paymentmethod: string;
    idUser: string;
    status: string;
    completed: boolean;
    paidAt: string;
    deliveredAt: string;
};

export function AddEditOrder() {
    const [formAddEditOrder] = Form.useForm();
    const formLabel = (value: string) => <Text strong>{value}</Text>;

    const handleResetAll = () => {
        formAddEditOrder.resetFields();
    };

    const onFinish = useCallback((values: FieldType) => {
        console.log(values);
    }, []);

    return (
        <div className={styles.container}>
            <Form
                form={formAddEditOrder}
                name="addeditorder"
                scrollToFirstError
                style={{ paddingBlock: 32, width: "100%" }}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout={"vertical"}
            >
                <Form.Item wrapperCol={{ offset: 0 }}>
                    <Flex gap="small">
                        <ButtonConfig
                            className={"button-submit"}
                            type="primary"
                            htmlType={"submit"}
                            lable={"Submit"}
                        />
                        <ButtonConfig
                            danger
                            onClick={handleResetAll}
                            lable={"Reset all"}
                        />
                    </Flex>
                </Form.Item>
                <Form.Item<FieldType>
                    label={formLabel("Payment Method")}
                    name={"paymentmethod"}
                    rules={[
                        {
                            required: true,
                            message: "Please input your payment method!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label={formLabel("ID User")}
                    name={"idUser"}
                    rules={[
                        {
                            required: true,
                            message: "Please input ID User!",
                        },
                    ]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item<FieldType>
                    label={formLabel("Status")}
                    name={"status"}
                    rules={[
                        {
                            required: true,
                            message: "Please input your status!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label={formLabel("Completed")}
                    name={"completed"}
                    initialValue={false}
                >
                    <Radio.Group>
                        <Radio value={true}>True</Radio>
                        <Radio value={false}>False</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </div>
    );
}
