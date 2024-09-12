import {
    Flex,
    Form,
    Image,
    Input,
    notification,
    Radio,
    Typography,
} from "antd";
import styles from "./AddEditUser.module.scss";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { ButtonConfig } from "@/components/buttonconfig";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../apis/getUser";
import { useUpdateUser } from "../apis/updateUser";
import { queryClient } from "@/lib/react-query";
import { userUrl } from "@/routes/urls";
import { useCreateUser } from "../apis/createUser";

const { Text } = Typography;

type FieldType = {
    name?: string;
    email?: string;
    position?: string;
    password?: string;
    confirmPassword?: string;
    isAdmin?: boolean;
};

export function AddEditUser() {
    const navigate = useNavigate();
    const [formAddEditUser] = Form.useForm();
    const [image, setImage] = useState<any>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const id = useParams()?.id;
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

    const configUpdateUser = useUpdateUser({
        config: {
            onSuccess: () => {
                notification.success({
                    message: "Updated user",
                });
                queryClient.invalidateQueries(["get-users"]);
                navigate(userUrl);
            },
            onError: (e) => {
                notification.error({
                    message: e?.response?.data?.detail,
                });
            },
        },
    });

    const configCreateUser = useCreateUser({
        config: {
            onSuccess: () => {
                notification.success({
                    message: "Created user",
                });
                queryClient.invalidateQueries(["get-users"]);
                navigate(userUrl);
            },
            onError: (e) => {
                notification.error({
                    message: e?.response?.data?.detail,
                });
            },
        },
    });

    const onFinish = useCallback(
        (values: FieldType) => {
            const draftDataUpdate = {
                id: id,
                name: values.name,
                email: values.email,
                image: image,
                isAdmin: values.isAdmin,
            };
            const draftDataCreate = {
                name: values.name,
                email: values.email,
                password: values.password,
                image: image,
                isAdmin: values.isAdmin,
            };
            if (id) {
                configUpdateUser.mutate(draftDataUpdate);
            } else {
                configCreateUser.mutate(draftDataCreate);
            }
        },
        [image],
    );

    {
        id &&
            useGetUser({
                data: {
                    id: id,
                },
                config: {
                    onSuccess: (res) => {
                        formAddEditUser.setFieldsValue(res?.data);
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

                {!id && (
                    <>
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
                    </>
                )}

                <Form.Item<FieldType>
                    label={formLabel("IsAdmin")}
                    name="isAdmin"
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
