import { layoutUrl, orderUrl, productUrl, userUrl } from "@/routes/urls";
import {
    HomeFilled,
    OrderedListOutlined,
    ProductFilled,
    UsergroupAddOutlined,
} from "@ant-design/icons";

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
    {
        path: orderUrl,
        name: "Order",
        icon: <OrderedListOutlined />,
    },
];
