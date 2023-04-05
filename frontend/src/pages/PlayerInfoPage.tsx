import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import {
    UserContextType,
    User,
    Player,
    ViewContextType,
    View,
    PlayerObj,
    PlayerPhysicalObj,
    PlayerPhysical,
    PlayerOption,
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
    Modal,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import ViewContext from "../context/ViewContext";
import { InfoPopup } from "../shared/InfoPopup";
import { createRoute } from "../shared/proxy";

interface PIProps {
    player: Player | null;
    ctx: any;
    handleMoreInfo: () => void;
}

const PlayerInfo = ({ player, ctx, handleMoreInfo }: PIProps) => {
    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 6, md: 12 }}
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
                                    {player && player[key as keyof Player]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
            {/* UNUSED/DEPRECATED */}
            {/* <Grid item xs={2} sm={3} md={3} textAlign="center">
                <Button
                    variant="outlined"
                    sx={{
                        height: "100%",
                        width: "100%",
                        top: "50%",
                        transform: "translate(0,-50%)",
                    }}
                    onClick={handleMoreInfo}
                >
                    More
                </Button>
            </Grid> */}
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
        playerID: "P999",
        name: "Test Player",
        position: "Test",
        playerNumber: 999,
        phoneNumber: "999-9999",
        rankNumber: 9,
        rankType: "Test",
        teamType: "Test",
        teamName: "Test",
        division: "Test",
        scheduleID: "Test",
    };

    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [options, setOptions] = useState<PlayerOption[]>([]);

    const fetchOptions = async () => {
        // TODO actually integrate w server later
        // intial fetch of options will be from SELECT * on backend
        // const options = [tmpPlayer];
        const res = await fetch(createRoute("options/players"));
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

    const handleSelectedChange = async (
        e: any,
        newValue: PlayerOption | null
    ) => {
        console.log(newValue);

        if (!newValue) {
            setSelectedPlayer(null);
            return;
        }

        try {
            const res = await fetch(
                createRoute(`players/${newValue?.playerID}`)
            );

            const data: Player = await res.json();

            setSelectedPlayer(data);
        } catch (e) {
            console.log(e);
        }

        // setSelectedPlayer(newValue);
    };

    const handleMoreInfo = async () => {
        // console.log("More");

        if (selectedPlayer) {
            // console.log(selectedPlayer);
            handleOpenInfoPopup();
        } else {
            console.log("please select a player");
        }

        // handleOpenInfoPopup();
    };

    const [moreInfoOpen, setMoreInfoOpen] = React.useState(false);
    const handleOpenInfoPopup = () => setMoreInfoOpen(true);
    const handleCloseInfoPopup = () => setMoreInfoOpen(false);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {isAuthenticated && view === View.Player && (
                    <>
                        <Typography variant="h6">MY PROFILE</Typography>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <PlayerInfo
                            player={tmpPlayer}
                            ctx={{ more: true }}
                            handleMoreInfo={handleMoreInfo}
                        />
                        <Divider sx={{ mt: 2, mb: 1 }} />
                    </>
                )}
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">SELECT A PLAYER</Typography>
                    </Box>
                    <Autocomplete
                        disablePortal
                        id="player-selection"
                        value={selectedPlayer}
                        options={options}
                        getOptionLabel={(option) => option.name}
                        onChange={handleSelectedChange}
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
                <PlayerInfo
                    player={selectedPlayer}
                    ctx={selectedPlayer ? { more: true } : { more: false }}
                    handleMoreInfo={handleMoreInfo}
                />
                <Divider sx={{ mt: 2, mb: 1 }} />
                {/* Modal for extra player info display */}
                {/* <Button onClick={handleOpenInfoPopup}>Open modal</Button> */}
                <Modal open={moreInfoOpen} onClose={handleCloseInfoPopup}>
                    <Paper>
                        <InfoPopup>
                            <Typography variant="h6">
                                Player:{" "}
                                {selectedPlayer ? selectedPlayer.name : ""}
                            </Typography>
                            <Divider />
                            {Object.entries(PlayerPhysicalObj).map(
                                ([key, value], index) => {
                                    return (
                                        <Typography key={index}>
                                            {key}: {/* todo get physicals*/}
                                        </Typography>
                                    );
                                }
                            )}

                            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => {
                                console.log(i);
                                return <div key={i}>v</div>;
                            })} */}
                        </InfoPopup>
                    </Paper>
                </Modal>

                {/*Player Table*/}
                {/* <Grid>
                    <Typography variant="h6">TODO Table</Typography>
                </Grid> */}
            </Box>
        </div>
    );
};

export default PlayerInfoPage;
