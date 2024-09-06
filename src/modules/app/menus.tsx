import {
    layoutUrl,
    productUrl,
    userUrl,
} from "@/routes/urls";
import { HomeFilled, ProductFilled, UsergroupAddOutlined } from "@ant-design/icons";

export const defaultMenus = [
    {
        path: layoutUrl,
        name: "Dash Board",
        icon: <HomeFilled />,
    },
    {
        path: userUrl,
        name: "User",
        icon: <UsergroupAddOutlined />,
    },
    {
        path: productUrl,
        name: "Product",
        icon: <ProductFilled />,
    },
];
