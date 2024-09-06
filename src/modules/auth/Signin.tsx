import { Button, Form, Input, notification } from "antd";
import styles from "./Signin.module.scss";
import { WarningOutlined } from "@ant-design/icons";
import { RULES_LOGIN } from "./rules";


type FieldType = {
    email?: string;
    password?: string;
};

export function Signin(): JSX.Element {
    //const navigate = useNavigate();

    // const configLoginAccount = useLoginAccount({
    //     config: {
    //         onSuccess: (res) => {
    //             const data = res?.data;
    //             notification.success({
    //                 message: "Loged In!",
    //             });
    //             storage.setToken(data.access_token);
    //             storageRefreshToken.setToken(data.refresh_token);
    //             dispatch(
    //                 loginAcc({
    //                     user: data?.user,
    //                 }),
    //             );
    //             navigate(-1);
    //         },
    //         onError: (e) => {
    //             notification.error({
    //                 message: e.response?.data?.detail,
    //             });
    //         },
    //     },
    // });

    const onFinish = (values: FieldType) => {
        const data = {
            email: values.email,
            password: values.password,
        };
        console.log(data)
    };

    const onFinishFailed = (errorInfo: any) => {
        notification.error({
            message: `Could not sign in. Please try again!`,
            description: ` ${errorInfo}`,
            icon: <WarningOutlined className="warning" />,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <Form
                    name="signin"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={RULES_LOGIN.email}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={RULES_LOGIN.password}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className={styles.button} htmlType="submit">
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
