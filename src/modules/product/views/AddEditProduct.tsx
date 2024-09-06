import { Flex, Form, Image, Input, Typography } from "antd";
import styles from "./AddEditProduct.module.scss";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;

type FieldType = {
    name?: string;
    image?: string;
    description?: string;
    price?: string;
};

export function AddEditProduct() {
    const [formAddEditProduct] = Form.useForm();
    const [image, setImage] = useState<any>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formLabel = (value: string) => <Text strong>{value}</Text>;

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

    const onFinish = useCallback(
        (values: FieldType) => {
            const draftData = {
                id: "??",
                name: values.name,
                image: values.image,
                password: values.description,
                price: values.price,
            };
            console.log(draftData);
        },
        [image],
    );

    return (
        <div className={styles.container}>
            <Form
                form={formAddEditProduct}
                name="addeditproduct"
                scrollToFirstError
                style={{ paddingBlock: 32, width: "100%" }}
                labelCol={{ span: 5 }}
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
                    label={formLabel("Price")}
                    name={"price"}
                    rules={[
                        { required: true, message: "Please input your price!" },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
}
