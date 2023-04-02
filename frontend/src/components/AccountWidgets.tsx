//unused

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { UserContextType } from "../shared/types";

const AccountWidgets = () => {
    const { user } = useContext(UserContext) as UserContextType;

    return (
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton size="large" edge="end" color="inherit">
                <Typography>{user}</Typography>
            </IconButton>
        </Box>
    );
};

export default AccountWidgets;
