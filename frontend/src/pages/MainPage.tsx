import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";

interface TPDProps {
    data: any[]; // todo type properly
    label: string;
    handleRefresh: () => void;
}

const TopPerformerDisplay = ({ data, label, handleRefresh }: TPDProps) => {
    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <Box display="flex" alignItems="end">
                    <Typography variant="h6">TOP {label}</Typography>
                </Box>
                <Button variant="outlined" onClick={handleRefresh}>
                    Refresh
                </Button>
            </Stack>
            <Divider sx={{ mt: 0, mb: 1 }} />
            <Container>
                {/* sx={{ border: "1px solid blue" }}> */}
                <Paper
                    sx={{
                        width: 600,
                        maxWidth: 1050,
                        height: 150,
                        overflowX: "auto",
                        border: "1px solid red",
                        margin: "0 auto",
                    }}
                >
                    <List component={Stack} direction="row">
                        {data.map((value, index) => {
                            return (
                                <Paper key={index}>
                                    <ListItem
                                        sx={{
                                            minWidth: 200,
                                            maxWidth: 200,
                                        }}
                                    >
                                        <ListItemText
                                            primary="TODO"
                                            secondary="TODO"
                                        />
                                    </ListItem>
                                </Paper>
                            );
                        })}
                    </List>
                </Paper>
            </Container>
        </>
    );
};

const MainPage = () => {
    const refreshTopTeams = async () => {
        console.log("refreshing teams");
    };

    const refreshTopPlayers = async () => {
        console.log("refreshing players");
    };

    const refreshOverview = async () => {
        console.log("refreshing");
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">OVERVIEW</Typography>
                    <Button variant="outlined" onClick={refreshOverview}>
                        Refresh
                    </Button>
                </Stack>
                <Divider sx={{ mt: 0, mb: 1 }} />
                {/*  */}
                <Grid
                    container
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 6, md: 12 }}
                >
                    <Grid item xs={2} sm={3} md={6}>
                        <Card style={{ height: 150 }}>
                            <CardContent>
                                <Typography
                                    variant="overline"
                                    color="text.secondary"
                                >
                                    TOP TEAM
                                </Typography>
                                <Typography variant="h5">aaa</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2} sm={3} md={6}>
                        <Card style={{ height: 150 }}>
                            <CardContent>
                                <Typography
                                    variant="overline"
                                    color="text.secondary"
                                >
                                    TOP PLAYER
                                </Typography>
                                <Typography variant="h5">bbbb</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {/*  */}
                <Divider sx={{ mt: 1, mb: 1 }} />
                <TopPerformerDisplay
                    data={["AAA", "BB", "C", "d"]}
                    label="TEAMS"
                    handleRefresh={refreshTopTeams}
                />
                <Divider sx={{ mt: 1, mb: 1 }} />
                <TopPerformerDisplay
                    data={["PLAYER1"]}
                    label="PLAYERS"
                    handleRefresh={refreshTopPlayers}
                />
                <Divider sx={{ mt: 1, mb: 1 }} />
            </Box>
        </div>
    );
};

export default MainPage;
