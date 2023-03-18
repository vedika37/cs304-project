import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import InjuryInfoPage from "./pages/InjuryInfoPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Page404 from "./pages/Page404";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import ScheduleInfoPage from "./pages/ScheduleInfoPage";
import TeamInfoPage from "./pages/TeamInfoPage";

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
                    path: "personal-info",
                    element: <PersonalInfoPage />,
                },
                {
                    path: "injury-info",
                    element: <InjuryInfoPage />,
                },
                {
                    path: "team-info",
                    element: <TeamInfoPage />,
                },
                {
                    path: "schedule-info",
                    element: <ScheduleInfoPage />,
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
