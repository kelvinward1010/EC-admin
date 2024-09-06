import { createBrowserRouter, Navigate } from "react-router-dom";
import {
    addProductUrl,
    addUserUrl,
    editProductUrl,
    editUserUrl,
    layoutUrl,
    productUrl,
    signinUrl,
    userUrl,
} from "./urls";
import { ErrorBoundaryPage } from "@/components/error/boundary-error";
import { AddEditProduct, AddEditUser, DashBoard, Layout, Product, User } from "@/modules";

interface RouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
    const user = true;
    return user ? <>{children}</> : <Navigate to={signinUrl} replace />;
};

export const routerConfig = createBrowserRouter([
    {
        path: layoutUrl,
        element: <Layout />,
        errorElement: (
            <ProtectedRoute>
                <Layout>
                    <ErrorBoundaryPage />
                </Layout>
            </ProtectedRoute>
        ),
        children: [
            {
                path: layoutUrl,
                element: <DashBoard />,
            },
            {
                path: userUrl,
                element: <User />,
            },
            {
                path: editUserUrl,
                element: <AddEditUser />,
            },
            {
                path: addUserUrl,
                element: <AddEditUser />,
            },
            {
                path: productUrl,
                element: <Product />,
            },
            {
                path: editProductUrl,
                element: <AddEditProduct />,
            },
            {
                path: addProductUrl,
                element: <AddEditProduct />,
            },
        ],
    },
]);
