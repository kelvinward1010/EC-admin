import {
    Col,
    Flex,
    Form,
    Image,
    Input,
    notification,
    Row,
    Select,
    Typography,
} from "antd";
import styles from "./AddEditProduct.module.scss";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import { UploadOutlined } from "@ant-design/icons";
import { TYPESIMAGES, TYPESPRODUCTS } from "@/constant/config";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProduct } from "../apis/updateProduct";
import { queryClient } from "@/lib/react-query";
import { productUrl } from "@/routes/urls";
import { useCreateProduct } from "../apis/createProduct";
import { useGetProduct } from "../apis/getProduct";

const { Text } = Typography;

type FieldType = {
    name?: string;
    image?: string;
    description?: string;
    quantity?: number;
    price?: number;
    type?: string;
    typeupload?: string;
};

export function AddEditProduct() {
    const navigate = useNavigate();
    const [formAddEditProduct] = Form.useForm();
    const [image, setImage] = useState<any>();
    const [appreciationfromaoi, setAppreciationfromapi] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const id = useParams()?.id;
    const formLabel = (value: string) => <Text strong>{value}</Text>;
    const typeuploadImg = Form.useWatch("typeupload", formAddEditProduct);

    const handleChangeInputImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        if (files !== null && files.length) reader.readAsDataURL(files[0]);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleResetAll = () => {
        formAddEditProduct.resetFields();
        setImage("");
    };

    const configUpdateProduct = useUpdateProduct({
        config: {
            onSuccess: () => {
                notification.success({
                    message: "Updated product",
                });
                queryClient.invalidateQueries(["get-products"]);
                navigate(productUrl);
            },
            onError: (e) => {
                notification.error({
                    message: e?.message,
                });
            },
        },
    });

    const configCreateProduct = useCreateProduct({
        config: {
            onSuccess: () => {
                notification.success({
                    message: "Created product",
                });
                queryClient.invalidateQueries(["get-products"]);
                navigate(productUrl);
            },
            onError: (e) => {
                notification.error({
                    message: e?.message,
                });
            },
        },
    });

    const onFinish = useCallback(
        (values: FieldType) => {
            const draftDataUpdate = {
                id: id,
                name: values.name,
                image:
                    image && typeuploadImg === "Upload"
                        ? image
                        : typeuploadImg === "Link URL"
                          ? values.image
                          : "",
                description: values.description,
                quantity: Number(values.quantity),
                price: Number(values.price),
                type: values.type,
                appreciation: appreciationfromaoi,
            };
            const draftDataCreate = {
                name: values.name,
                image:
                    typeuploadImg === "Upload"
                        ? image
                        : !image && !values.image
                          ? ""
                          : values.image,
                description: values.description,
                quantity: Number(values.quantity),
                price: Number(values.price),
                type: values.type,
                appreciation: [],
            };
            if (id) {
                configUpdateProduct.mutate(draftDataUpdate);
            } else {
                configCreateProduct.mutate(draftDataCreate);
            }
        },
        [image],
    );

    {
        id &&
            useGetProduct({
                data: {
                    id: id,
                },
                config: {
                    onSuccess: (res) => {
                        formAddEditProduct.setFieldsValue(res?.data);
                        setAppreciationfromapi(res?.data?.appreciation);
                        setImage(res?.data?.image);
                    },
                    onError: (e: any) => {
                        notification.error({
                            message: e?.response?.data?.detail,
                        });
                    },
                },
            });
    }

    return (
        <div className={styles.container}>
            <Form
                form={formAddEditProduct}
                name="addeditproduct"
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
                <Row justify={"space-between"}>
                    <Col span={15}>
                        {typeuploadImg === "Upload" ? (
                            <Form.Item label={formLabel("Image")}>
                                <ButtonConfig
                                    icon={<UploadOutlined />}
                                    iconPosition={"start"}
                                    onClick={handleButtonClick}
                                    lable={"Click to upload"}
                                >
                                    <input
                                        style={{ display: "none" }}
                                        ref={fileInputRef}
                                        accept="image/*"
                                        type={"file"}
                                        onChange={handleChangeInputImage}
                                    />
                                </ButtonConfig>
                                {image && (
                                    <Image
                                        width={200}
                                        src={image}
                                        style={{ margin: "0 0 0 10px" }}
                                    />
                                )}
                            </Form.Item>
                        ) : (
                            <Form.Item<FieldType>
                                label={formLabel("Link URL Image")}
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input link URL!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        )}
                    </Col>
                    <Col span={7}>
                        <Form.Item<FieldType>
                            label={formLabel("Type Upload")}
                            name={"typeupload"}
                            initialValue={"Upload"}
                        >
                            <Select allowClear options={TYPESIMAGES} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item<FieldType>
                    label={formLabel("Name")}
                    name="name"
                    rules={[
                        { required: true, message: "Please input your name!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label={formLabel("Desciption")}
                    name={"description"}
                    rules={[
                        {
                            required: true,
                            message: "Please input your description!",
                        },
                    ]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item<FieldType>
                    label={formLabel("Quantity")}
                    name={"quantity"}
                    rules={[
                        {
                            required: true,
                            message: "Please input your quantity!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label={formLabel("Price")}
                    name={"price"}
                    rules={[
                        { required: true, message: "Please input your price!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label={formLabel("Type")}
                    name={"type"}
                    initialValue={"Fashion"}
                >
                    <Select
                        allowClear
                        style={{ width: "100%" }}
                        options={TYPESPRODUCTS}
                    />
                </Form.Item>
            </Form>
        </div>
    );
}
