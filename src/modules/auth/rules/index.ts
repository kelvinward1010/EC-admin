import { FormRule } from "antd";
import { LoginAccountProps } from "../types";

export const RULES_LOGIN: Record<keyof LoginAccountProps, FormRule[]> = {
    email: [{ required: true, message: "Please input your email!" }],
    password: [{ required: true, message: "Please input your password!" }],
};