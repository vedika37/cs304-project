import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import {
    UserContextType,
    ViewContextType,
    View,
    Team,
    TeamObj,
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
            {team && (
                <Grid item xs={2} sm={3} md={3}>
                    <Card style={{ height: "100%" }}>
                        <CardContent>
                            <Typography
                                variant="overline"
                                color="text.secondary"
                            >
                                {/* TODO */}
                                CURRENT RANKING (?QUERY)
                            </Typography>
                            <Typography variant="h5">{"TODO"}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
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

    const fetchOptions = async () => {
        // todo error handling
        const res = await fetch("http://localhost:3001/teams");
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
                {/*Team Table*/}
                <Grid>
                    <Typography variant="h6">TODO</Typography>
                    <Button variant="outlined">Get Players</Button>
                </Grid>
            </Box>
        </div>
    );
};

export default TeamInfoPage;
