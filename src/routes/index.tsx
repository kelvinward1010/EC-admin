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
import {
    AddEditProduct,
    AddEditUser,
    DashBoard,
    Layout,
    Product,
    SignIn,
    User,
} from "@/modules";
import { IUser } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface RouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
    const user: IUser | null = useSelector(
        (state: RootState) => state.auth.user,
    );
    return user === null ? (
        <Navigate to={signinUrl} replace />
    ) : (
        <>{children}</>
    );
};

export const routerConfig = createBrowserRouter([
    {
        path: layoutUrl,
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        errorElement: (
            <Layout>
                <ErrorBoundaryPage />
            </Layout>
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
    {
        path: signinUrl,
        element: <SignIn />,
        errorElement: <ErrorBoundaryPage />,
    },
]);
