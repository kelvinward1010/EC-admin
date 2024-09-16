import { lazyLoad } from "@/utils/loadable";

export const Layout = lazyLoad(
    () => import("./app/Layout"),
    (module) => module.Layout,
);

export const SignIn = lazyLoad(
    () => import("./auth/Signin"),
    (module) => module.Signin,
);

export const DashBoard = lazyLoad(
    () => import("./dashboard/views/DashBoard"),
    (module) => module.DashBoard,
);

export const User = lazyLoad(
    () => import("./user/views/User"),
    (module) => module.User,
);

export const AddEditUser = lazyLoad(
    () => import("./user/views/AddEditUser"),
    (module) => module.AddEditUser,
);

export const Product = lazyLoad(
    () => import("./product/views/Product"),
    (module) => module.Product,
);

export const AddEditProduct = lazyLoad(
    () => import("./product/views/AddEditProduct"),
    (module) => module.AddEditProduct,
);

export const Order = lazyLoad(
    () => import("./order/views/Order"),
    (module) => module.Order,
);

export const AddEditOrder = lazyLoad(
    () => import("./order/views/AddEditOrder"),
    (module) => module.AddEditOrder,
);
