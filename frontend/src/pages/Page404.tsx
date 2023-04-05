import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Grid>
                <h2>Page not found! 404</h2>
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Home
                </Button>
            </Grid>
        </div>
    );
};

export default Page404;
