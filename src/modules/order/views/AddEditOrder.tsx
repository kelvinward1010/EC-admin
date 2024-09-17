import {
    Col,
    Flex,
    Form,
    Image,
    Input,
    Modal,
    Radio,
    Row,
    Select,
    Typography,
} from "antd";
import styles from "./AddEditOrder.module.scss";
import { useCallback, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import { PAYMENTMETHODS, STATUSORDER } from "@/constant/config";
import { IProductTable } from "@/modules/product/types";
import TableProductInOrder from "../components/TableProduct";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

type FieldType = {
    name: string;
    paymentmethod: string;
    idUser: string;
    deliveryaddress: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    yourinvoice: {
        price: number;
        shipping_price: number;
        totalprice: number;
    };
    status: string;
    completed: boolean;
    deliveredAt: string;
};

interface FormProductInOrderProps {
    lists: IProductTable[];
}

export function AddEditOrder() {
    const [formAddEditOrder] = Form.useForm();
    const [openModalAddProducts, setOpenModalAddProducts] =
        useState<boolean>(false);
    const [productsSelected, setProductsSelected] = useState<IProductTable[]>(
        [],
    );
    const formLabel = (value: string) => <Text strong>{value}</Text>;

    const handleResetAll = () => {
        formAddEditOrder.resetFields();
    };

    const handleDelete = (productId: string) => {
        const updatedList = productsSelected.filter(
            (product) => product._id !== productId,
        );
        setProductsSelected(updatedList);
    };

    function FormProductInOrder({ lists }: FormProductInOrderProps) {
        return (
            <div className={styles.containerinformlist}>
                {lists?.map((item) => (
                    <Row
                        wrap
                        key={item._id}
                        className={styles.iteminlist}
                        align={"middle"}
                    >
                        <Col span={19}>
                            <Flex gap={20} wrap align={"center"}>
                                <Image width={120} src={item.image} />
                                <div>
                                    <Text>Name: {item.name}</Text>
                                    <br />
                                    <Text>Price: {item.price}</Text>
                                    <br />
                                    <Text>Type: {item.type}</Text>
                                </div>
                            </Flex>
                        </Col>
                        <Col span={4}>
                            <ButtonConfig
                                lable={<DeleteOutlined />}
                                onClick={() => handleDelete(item._id)}
                            />
                        </Col>
                    </Row>
                ))}
            </div>
        );
    }

    const onFinish = useCallback((values: FieldType) => {
        console.log(values);
    }, []);

    return (
        <div className={styles.container}>
            {openModalAddProducts && (
                <Modal
                    title={"Add products to your order"}
                    open={openModalAddProducts}
                    onCancel={() => setOpenModalAddProducts(false)}
                    centered
                    footer={false}
                    width={1500}
                >
                    <div className={styles.center}>
                        <TableProductInOrder
                            setProductsSelected={setProductsSelected}
                        />
                    </div>
                </Modal>
            )}
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
                    label={formLabel("Name order")}
                    name={"name"}
                    rules={[
                        {
                            required: true,
                            message: "Please input name order!",
                        },
                    ]}
                >
                    <Input />
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
                    <Select
                        allowClear
                        placeholder="Select payment method"
                        style={{ width: "100%" }}
                        options={PAYMENTMETHODS}
                    />
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
                    <Input />
                </Form.Item>

                <Row>
                    <Col span={8}>{formLabel("Delivery address:")}</Col>
                    <Col span={16}>
                        <Form.Item<FieldType>
                            label={formLabel("Name")}
                            name={["deliveryaddress", "name"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input name!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={formLabel("Email")}
                            name={["deliveryaddress", "email"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input eamil!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={formLabel("Phone")}
                            name={["deliveryaddress", "phone"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input phone!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={formLabel("Address")}
                            name={["deliveryaddress", "address"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input address!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row style={{ margin: "15px 0 20px" }}>
                    <Col span={8}>{formLabel("Products:")}</Col>
                    <Col span={16}>
                        <ButtonConfig
                            onClick={() => setOpenModalAddProducts(true)}
                            lable={"Add products"}
                        />
                        <FormProductInOrder lists={productsSelected} />
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>{formLabel("Your invoice:")}</Col>
                    <Col span={16}>
                        <Form.Item<FieldType>
                            label={formLabel("Price")}
                            name={["yourinvoice", "price"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input price!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={formLabel("Shipping price")}
                            name={["yourinvoice", "shipping_price"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input shipping price!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={formLabel("Total price")}
                            name={["yourinvoice", "totalprice"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input total price!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

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
