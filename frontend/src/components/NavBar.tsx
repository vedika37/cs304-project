import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "../layouts/MainLayout";
import NavContainerContext, {
    NavContainerContextType,
} from "../context/NavContainerContext";
import AccountWidgets from "./AccountWidgets";
import UserContext, { UserContextType } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import yellow from "@mui/material/colors/yellow";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

// MUI appbar template styling //////////////////////////////
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// ///////////////////////// MUI appbar template styling /////

// CLEANUP after this is no longer needed
const FakeAuthButton = styled("button")({
    width: "100px",
    height: "30px",
    position: "absolute",
    right: 0,
    bottom: 0,
    transform: "translate(0,100%)",
});

const NavBar = () => {
    const { isAuthenticated, fakeAuth } = useContext(
        UserContext
    ) as UserContextType;

    const { sideBarOpen, handleSideBarOpen } = useContext(
        NavContainerContext
    ) as NavContainerContextType;

    const navigate = useNavigate();

    return (
        <AppBar position="fixed" open={sideBarOpen}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleSideBarOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(sideBarOpen && { display: "none" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    <div className="app-title">
                        Sports Organization Management Tool
                    </div>
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {isAuthenticated && <AccountWidgets />}
                {!isAuthenticated && (
                    <Button onClick={() => navigate("/login")} color="inherit">
                        Login
                    </Button>
                )}
            </Toolbar>
            <FakeAuthButton onClick={fakeAuth}>setAuth</FakeAuthButton>
        </AppBar>
    );
};

export default NavBar;
