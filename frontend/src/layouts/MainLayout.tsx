import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { NavContainerProvider } from "../context/NavContainerContext";
import MainPage from "../pages/MainPage";
import { Outlet } from "react-router-dom";

// MUI template styling /////////////////////////////////

export const drawerWidth = 240; // this is bad design fix later TODO

export const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

// ///////////////////////////// MUI template styling ////

export default function MainLayout() {
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex" }}>
            {/* default css from mui template */}
            <CssBaseline />

            {/* --NAV ------------------------------------------ */}
            {/* navbar */}
            <NavContainerProvider>
                <NavBar />
                {/* sidebar*/}
                <SideBar />
            </NavContainerProvider>

            {/* ------------------------------------------ NAV-- */}

            {/* Main app */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
                {/* legacy */}
                {/* <MainPage /> */}
            </Box>
        </Box>
    );
}
