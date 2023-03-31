import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "../layouts/MainLayout";
import NavContainerContext from "../context/NavContainerContext";
import { NavContainerContextType } from "../shared/types";
import AccountWidgets from "./AccountWidgets";
import UserContext from "../context/UserContext";
import { UserContextType } from "../shared/types";
import { useNavigate } from "react-router-dom";

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

const NavBar = () => {
    const { isAuthenticated } = useContext(UserContext) as UserContextType; //TODO FIX ERROR

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
                    <Button
                        variant="contained"
                        className="app-title"
                        onClick={() => navigate("/")}
                    >
                        Sports Organization Management Tool
                    </Button>
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {isAuthenticated && <AccountWidgets />}
                {!isAuthenticated && (
                    <Button onClick={() => navigate("/login")} color="inherit">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
