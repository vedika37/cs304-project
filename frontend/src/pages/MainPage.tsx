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
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Player, Team } from "../shared/types";
import { createRoute } from "../shared/proxy";

import SportsBarIcon from "@mui/icons-material/SportsBar";

interface TPDProps {
    data: string[]; // only takes a string name of team/palyer for now
    label: string;
    handleRefresh: () => void;
}

// TODO STYLING NEEDS WORK!!!!!!!!!!!
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
                        height: 160,
                        overflowX: "auto",
                        border: "1px solid #e0e0e0",
                        margin: "0 auto",
                        p: 2,
                    }}
                >
                    <List component={Stack} direction="row">
                        {data.map((value, index) => {
                            return (
                                <Paper
                                    key={index}
                                    sx={{
                                        m: 1,
                                    }}
                                >
                                    <ListItem
                                        sx={{
                                            minWidth: 200,
                                            maxWidth: 200,
                                            minHeight: "100%",
                                            maxHeight: 100,
                                            m: 1,
                                        }}
                                    >
                                        {/*  */}
                                        {/* placeholder bc no avatars/icons */}
                                        <ListItemIcon>
                                            <SportsBarIcon></SportsBarIcon>
                                        </ListItemIcon>
                                        {/*  */}
                                        <ListItemText primary={value} />
                                        <Button>View</Button>
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
    const [topTeam, setTopTeam] = useState<Team | null>(null);
    const [topPlayer, setTopPlayer] = useState<Player | null>(null);

    const [topTeams, setTopTeams] = useState<string[] | []>([]);
    const [topPlayers, setTopPlayers] = useState<string[] | []>([]);

    const refreshTopTeam = async () => {
        // console.log("fetching top team");

        try {
            const res = await fetch(createRoute("api/best-performing-team"));

            // res handling goes here TODO
            if (res.status === 200) {
                const data: Team = await res.json();
                setTopTeam(data);
            } else {
                //display something went wrong message
            }
        } catch (e) {}
    };

    const refreshTopTeams = async () => {
        // console.log("refreshing teams");

        try {
            const res = await fetch(createRoute("api/high-performing-teams"));

            // TODO res status/error handling
            if (res.status === 200) {
                const data: string[] = await res.json();
                setTopTeams(data);
            } else {
                //display something went wrong message
            }
        } catch (e) {}
    };

    const refreshTopPlayers = async () => {
        // console.log("refreshing players");
    };

    const refreshOverview = async () => {
        // console.log("refreshing overview");
        refreshTopTeam();
        // refreshTopPlayer();
        refreshTopPlayers();
        refreshTopTeams();
    };

    useEffect(() => {
        // console.log("fetching overview data onmount");
        refreshOverview();
    }, []);

    const testData = () => {
        console.log("Players", topPlayer, topPlayers);
        console.log("Teams", topTeam, topTeams);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {/* <Button variant="contained" onClick={testData}>
                    TEST
                </Button> */}
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
                                <Typography variant="h5">
                                    {topTeam ? topTeam.name : ""}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* UNUSED/DEPRECATED */}
                    {/* <Grid item xs={2} sm={3} md={6}>
                        <Card style={{ height: 150 }}>
                            <CardContent>
                                <Typography
                                    variant="overline"
                                    color="text.secondary"
                                >
                                    TOP PLAYER
                                </Typography>
                                <Typography variant="h5">
                                    {topPlayer ? topPlayer.name : ""}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid> */}
                </Grid>
                {/*  */}
                <Divider sx={{ mt: 1, mb: 1 }} />
                <TopPerformerDisplay
                    data={topTeams.map((team) => team)}
                    label="TEAMS"
                    handleRefresh={refreshTopTeams}
                />
                <Divider sx={{ mt: 1, mb: 1 }} />
                {/* UNUSED/DEPRECATED */}
                {/* <TopPerformerDisplay
                    data={topPlayers.map((player) => player.name)}
                    label="PLAYERS"
                    handleRefresh={refreshTopPlayers}
                />
                <Divider sx={{ mt: 1, mb: 1 }} /> */}
            </Box>
        </div>
    );
};

export default MainPage;
