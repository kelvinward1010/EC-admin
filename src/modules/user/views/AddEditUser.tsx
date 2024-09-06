import { Flex, Form, Image, Input, Typography } from "antd";
import styles from "./AddEditUser.module.scss";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;

type FieldType = {
    name?: string;
    email?: string;
    position?: string;
    password?: string;
    confirmPassword?: string;
};

export function AddEditUser() {
    const [formAddEditUser] = Form.useForm();
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
        formAddEditUser.resetFields();
        setImage("");
    };

    const onFinish = useCallback(
        (values: FieldType) => {
            const draftData = {
                id: "??",
                name: values.name,
                email: values.email,
                password: values.password,
                image: image,
                position: values.position,
            };
            console.log(draftData);
        },
        [image],
    );

    return (
        <div className={styles.container}>
            <Form
                form={formAddEditUser}
                name="addedituser"
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
                    label={formLabel("Email")}
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label={formLabel("Password")}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The new password that you entered do not match!",
                                    ),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label={formLabel("Position")}
                    name="position"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
}
