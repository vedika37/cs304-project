import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import {
    UserContextType,
    ViewContextType,
    View,
    Team,
    TeamObj,
    Player,
} from "../shared/types";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import ViewContext from "../context/ViewContext";
import { createRoute } from "../shared/proxy";

interface TIProps {
    team: Team | null;
    ctx: any;
}

const TeamInfo = ({ team, ctx }: TIProps) => {
    // console.log(ctx);

    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 6, md: 12 }}
        >
            {Object.entries(TeamObj).map(([key, value], i) => {
                return (
                    <Grid item xs={2} sm={3} md={3} key={i}>
                        <Card style={{ height: "100%" }}>
                            <CardContent>
                                <Typography
                                    variant="overline"
                                    color="text.secondary"
                                >
                                    {key}
                                </Typography>
                                <Typography variant="h5">
                                    {team && team[key as keyof Team]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
            {/* UNUSED/DEPRECATED */}

            {/* team && (
                <Grid item xs={2} sm={3} md={3}>
                    <Card style={{ height: "100%" }}>
                        <CardContent>
                            <Typography
                                variant="overline"
                                color="text.secondary"
                            >
                                CURRENT RANKING (?QUERY)
                            </Typography>
                            <Typography variant="h5">{"TODO"}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ) */}
            <Grid item xs={2} sm={3} md={3} textAlign="center">
                {ctx.edit && (
                    <Button
                        variant="outlined"
                        sx={{
                            height: "100%",
                            width: "100%",
                            top: "50%",
                            transform: "translate(0,-50%)",
                        }}
                    >
                        Edit
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

const TeamInfoPage = () => {
    const { isAuthenticated, user } = useContext(
        UserContext
    ) as UserContextType;

    const { view } = useContext(ViewContext) as ViewContextType;

    // tmp user for testing
    const tmpTeam: Team = {
        type: "Test",
        name: "Test Team",
        division: "Test",
    };

    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [options, setOptions] = useState<Team[]>([]);
    //type
    const [topPlayer, setTopPlayer] = useState<any>(null);
    //fix typing
    const [coaches, setCoaches] = useState<any[]>([]);

    const fetchOptions = async () => {
        // todo error handling
        const res = await fetch(createRoute("options/teams"));
        // console.log(res.status);
        if (res.status === 200) {
            const data = await res.json();
            // console.log(data);
            const sData = data.map((o: any) => {
                delete o["id"];
                return o;
            });
            // console.log("sanitized", sData);
            setOptions(sData);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const handleSelectedChange = async (e: any, newValue: Team | null) => {
        // TODO run SELECT query for new value to pull most recent data

        setSelectedTeam(newValue);
    };

    const fetchTopPlayer = async () => {
        // todo error handling
        const res = await fetch(
            createRoute(`api/get-star-players/${selectedTeam?.name}`)
        );

        const data = await res.json();
        console.log(data);
        setTopPlayer(data);
    };

    const fetchCoachesForTeam = async () => {
        const res = await fetch(
            createRoute(`teams/${selectedTeam?.name}/coaches`)
        );

        const data = await res.json();
        console.log(data);
        setCoaches(data);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {isAuthenticated && view === View.Player && (
                    <>
                        <Typography variant="h6">MY PROFILE</Typography>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <TeamInfo team={tmpTeam} ctx={{ edit: false }} />
                        <Divider sx={{ mt: 2, mb: 1 }} />
                    </>
                )}
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">SELECT A TEAM</Typography>
                    </Box>
                    <Autocomplete
                        disablePortal
                        id="team-selection"
                        value={selectedTeam}
                        options={options}
                        getOptionLabel={(option) => option.name}
                        onChange={handleSelectedChange}
                        isOptionEqualToValue={(option, value) =>
                            option.type === value.type &&
                            option.name === value.name &&
                            option.division === value.division
                        }
                        sx={{ mt: 1, width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Team" />
                        )}
                    />
                </Stack>
                <Divider sx={{ mt: 1, mb: 1 }} />
                {/*Selected Team Info*/}
                <TeamInfo
                    team={selectedTeam}
                    ctx={
                        view === View.Admin && selectedTeam
                            ? { edit: true }
                            : { edit: false }
                    }
                />

                <Divider sx={{ mt: 2, mb: 1 }} />
                {/*Team player Table*/}
                <Grid>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (selectedTeam) {
                                fetchTopPlayer();
                            } else {
                                alert("Please select a team first");
                            }
                        }}
                    >
                        Get Top Player
                    </Button>
                </Grid>
                <Divider sx={{ mt: 1, mb: 1 }} />
                {/*  */}
                {topPlayer && (
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
                )}
                {/*  */}
                <Divider sx={{ mt: 2, mb: 1 }} />
                <Grid>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (selectedTeam) {
                                console.log("coaches fetch");
                                fetchCoachesForTeam();
                            } else {
                                alert("Please select a team first");
                            }
                        }}
                    >
                        Get Coaches that have worked with team
                    </Button>
                </Grid>
                <Divider sx={{ mt: 1, mb: 1 }} />
                {coaches.map((v, i) => (
                    <div key={i}>
                        ID: {v.coachID}
                        <br />
                        NAME: {v.name}
                    </div>
                ))}
            </Box>
        </div>
    );
};

export default TeamInfoPage;
