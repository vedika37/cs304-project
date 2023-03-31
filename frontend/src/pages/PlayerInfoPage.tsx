import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import {
    UserContextType,
    User,
    Player,
    ViewContextType,
    View,
    PlayerObj,
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

interface PIProps {
    player: Player;
}

const PlayerInfo = ({ player }: PIProps) => {
    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
        >
            {Object.entries(PlayerObj).map(([key, value], i) => {
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
                                    {player && player[key as keyof User]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
            <Grid item xs={2} sm={3} md={3} textAlign="center">
                <Button
                    variant="outlined"
                    sx={{
                        height: "90%",
                        width: "90%",
                        top: "50%",
                        transform: "translate(0,-50%)",
                    }}
                >
                    Edit
                </Button>
            </Grid>
        </Grid>
    );
};

const PlayerInfoPage = () => {
    const { isAuthenticated, user } = useContext(
        UserContext
    ) as UserContextType;

    const { view } = useContext(ViewContext) as ViewContextType;

    // tmp user for testing
    const tmpPlayer: Player = {
        playerID: "P001",
        name: "John Doe",
        position: "Forward",
        playerNumber: 7,
        phoneNumber: "555-1234",
        rankNumber: 1,
        rankType: "team",
        teamType: "Soccer",
        teamName: "The Lions",
        division: "Premier League",
        scheduleID: "S001",
    };

    // TODO type this state
    const [selectedPlayer, setSelectedPlayer] = useState<Player>(null);

    // intial fetch of options will be from SELECT * on backend
    const options = [tmpPlayer];

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {isAuthenticated && view === View.Player && (
                    <>
                        <Typography variant="h6">MY PROFILE</Typography>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <PlayerInfo player={tmpPlayer} />
                        <Divider sx={{ mt: 2, mb: 1 }} />
                    </>
                )}
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">
                            SELECT ANOTHER PLAYER
                        </Typography>
                    </Box>
                    <Autocomplete
                        disablePortal
                        id="player-selection"
                        value={selectedPlayer}
                        options={options}
                        getOptionLabel={(option) => option.name}
                        onChange={(e: any, newValue: Player | null) => {
                            // TODO run SELECT query for new value to pull most recent data
                            setSelectedPlayer(newValue);
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.playerID === value.playerID
                        }
                        sx={{ mt: 1, width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Player" />
                        )}
                    />
                </Stack>
                <Divider sx={{ mt: 1, mb: 1 }} />
                {/*Selected Player Info*/}
                <PlayerInfo player={selectedPlayer} />

                <Divider sx={{ mt: 2, mb: 1 }} />
                {/*Player Table*/}
                <Grid>
                    <Typography variant="h6">TODO Table</Typography>
                </Grid>
            </Box>
        </div>
    );
};

export default PlayerInfoPage;
