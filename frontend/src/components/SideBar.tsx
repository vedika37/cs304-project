import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { DrawerHeader } from "../layouts/MainLayout";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { drawerWidth } from "../layouts/MainLayout";
import NavContainerContext, {
    NavContainerContextType,
} from "../context/NavContainerContext";
import { Link } from "react-router-dom";

// MUI drawer template styling //////////////////////////////

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const SideBarDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

// /////////////////// MUI drawer template styling /////

const SideBar = () => {
    const { sideBarOpen, handleSideBarClose } = useContext(
        NavContainerContext
    ) as NavContainerContextType;

    return (
        <SideBarDrawer variant="permanent" open={sideBarOpen}>
            <DrawerHeader>
                <IconButton onClick={handleSideBarClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {/* tabs/links go here */}
                <ListItem key={1} disablePadding sx={{ display: "block" }}>
                    <Link to="f">A</Link>
                </ListItem>
                <ListItem key={2} disablePadding sx={{ display: "block" }}>
                    <Link to="b">B</Link>
                </ListItem>
            </List>
        </SideBarDrawer>
    );
};

export default SideBar;
