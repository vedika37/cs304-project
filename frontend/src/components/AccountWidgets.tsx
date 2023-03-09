import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

const AccountWidgets = () => {
    return (
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton size="large" color="inherit">
                <Badge badgeContent={14} color="error">
                    <MailIcon />
                </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
                <Badge badgeContent={20} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit">
                <AccountCircle />
            </IconButton>
        </Box>
    );
};

export default AccountWidgets;
