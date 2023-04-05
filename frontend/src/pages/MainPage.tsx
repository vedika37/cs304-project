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
import { Player, Team } from "../shared/types";

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
    const [topTeam, setTopTeam] = useState<Team | null>(null);
    const [topPlayer, setTopPlayer] = useState<Player | null>(null);

    const [topTeams, setTopTeams] = useState<Team[] | []>([]);
    const [topPlayers, setTopPlayers] = useState<Player[] | []>([]);

    const refreshTopTeams = async () => {
        console.log("refreshing teams");
    };

    const refreshTopPlayers = async () => {
        console.log("refreshing players");
    };

    const refreshOverview = async () => {
        console.log("refreshing overview");
    };

    useEffect(() => {
        console.log("fetching overview data onmount");
        refreshOverview();
    }, []);

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
                                <Typography variant="h5">
                                    {topTeam ? topTeam.name : ""}
                                </Typography>
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
                                <Typography variant="h5">
                                    {topPlayer ? topPlayer.name : ""}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {/*  */}
                <Divider sx={{ mt: 1, mb: 1 }} />
                <TopPerformerDisplay
                    data={topTeams.map((team) => team.name)}
                    label="TEAMS"
                    handleRefresh={refreshTopTeams}
                />
                <Divider sx={{ mt: 1, mb: 1 }} />
                <TopPerformerDisplay
                    data={topPlayers.map((player) => player.name)}
                    label="PLAYERS"
                    handleRefresh={refreshTopPlayers}
                />
                <Divider sx={{ mt: 1, mb: 1 }} />
            </Box>
        </div>
    );
};

export default MainPage;
