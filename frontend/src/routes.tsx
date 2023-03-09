import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Page404 from "./pages/Page404";

export default function AppRouter() {
    const routes = useRoutes([
        {
            path: "",
            element: <MainLayout />,
            children: [
                {
                    path: "",
                    element: <MainPage />,
                },
                {
                    path: "f",
                    element: <div>test</div>,
                },
            ],
        },
        {
            path: "login",
            element: <LoginPage />,
        },
        {
            path: "404",
            element: <Page404 />,
        },
        {
            path: "*",
            element: <Navigate to="/404" />,
        },
    ]);

    return routes;
}
