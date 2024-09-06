import { Logo } from "@/assets/images";
import {
    DefaultFooter,
    PageContainer,
    ProLayout,
    type MenuDataItem,
    type ProLayoutProps,
} from "@ant-design/pro-layout";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { defaultMenus } from "./menus";
import styles from "./Layout.module.scss";
import "./index.css";
import {
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    QuestionCircleFilled,
} from "@ant-design/icons";
import { Dropdown, Input } from "antd";

export type LayoutProps = {
    children?: React.ReactNode;
} & ProLayoutProps;

export const Layout: React.FC<LayoutProps> = (props) => {
    const { children } = props;
    const navigate = useNavigate();

    const loopMenuItem = (menus: any[]): MenuDataItem[] =>
        menus.map(({ icon, routes, ...item }) => ({
            ...item,
            icon: icon,
            children: routes && loopMenuItem(routes),
        }));

    const defaultFooterDom = (
        <DefaultFooter
            copyright={`${new Date().getFullYear()} Kelvin Ward`}
        />
    );

    const FormHeader = () => {
        return (
            <div className={styles.containerHeader}>
                <Input.Search className={styles.search} />
            </div>
        );
    };

    return (
        <ProLayout
            className={styles.containerLayout}
            logo={Logo}
            {...props}
            title="Ercomerce admin"
            layout={"mix"}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (
                    !menuItemProps.path ||
                    location.pathname === menuItemProps.path
                ) {
                    return defaultDom;
                }
                return (
                    <a onClick={() => navigate(menuItemProps.path as string)}>
                        {defaultDom}
                    </a>
                );
            }}
            menu={{
                request: async () => loopMenuItem(defaultMenus),
            }}
            avatarProps={{
                src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
                size: "small",
                title: "Kaito Kid",
                render: (_, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        icon: <LogoutOutlined />,
                                        label: "Sign out",
                                    },
                                ],
                            }}
                        >
                            {dom}
                        </Dropdown>
                    );
                },
            }}
            actionsRender={(props) => {
                if (props.isMobile) return [];
                if (typeof window === "undefined") return [];
                return [
                    <InfoCircleFilled key="InfoCircleFilled" />,
                    <QuestionCircleFilled key="QuestionCircleFilled" />,
                    <GithubFilled key="GithubFilled" />,
                ];
            }}
            breadcrumbRender={(routers = []) => [
                {
                    path: "/",
                },
                ...routers,
            ]}
            itemRender={(route, __, routes, paths) => {
                const first = routes.indexOf(route) === 0;
                return first ? (
                    <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
                ) : (
                    <span>{route.breadcrumbName}</span>
                );
            }}
            headerContentRender={FormHeader}
            footerRender={() => defaultFooterDom}
        >
            <PageContainer>
                <Outlet />
                {children}
            </PageContainer>
        </ProLayout>
    );
};
