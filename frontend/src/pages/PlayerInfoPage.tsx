import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { User, UserContextType } from "../shared/types";
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

// // UNUSED
// const PlayerSelection = ({ options, selectedUser, setSelectedUser }: any) => {
//     // const handleValueChange = () => {};

//     // if (selectedUser) {
//     //     return (
//     //         <Autocomplete
//     //             disablePortal
//     //             id="combo-box-demo"
//     //             options={options}
//     //             defaultValue={selectedUser.name}
//     //             sx={{ mt: 1, width: 300 }}
//     //             renderInput={(params) => (
//     //                 <TextField {...params} label="Player" />
//     //             )}
//     //         />
//     //     );
//     // }

//     return (
//         <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={options}
//             value={selectedUser ? selectedUser.name : null}
//             onChange={(e: any, newValue: string | null) => {
//                 setSelectedUser(tmpUser);
//             }}
//             sx={{ mt: 1, width: 300 }}
//             renderInput={(params) => <TextField {...params} label="Player" />}
//         />
//     );
// };

const PlayerInfoPage = () => {
    const { isAuthenticated, user } = useContext(
        UserContext
    ) as UserContextType;

    // tmp user for testing
    const tmpUser: User = {
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
    const [selectedUser, setSelectedUser]: any = useState(null);

    const options = [tmpUser];

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Autocomplete
                    disablePortal
                    id="player-selection"
                    value={selectedUser}
                    options={options}
                    getOptionLabel={(option) => option.name}
                    onChange={(e: any, newValue: User | null) => {
                        // TODO figure out a way to extract user obj from new value
                        setSelectedUser(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option.playerID === value.playerID
                    }
                    sx={{ mt: 1, width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Player" />
                    )}
                />
                {/* <PlayerSelection
                    options={options}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                /> */}
                <Divider sx={{ mt: 1, mb: 1 }} />
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {Object.entries(User).map(([key, value], i) => {
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
                                            {selectedUser && selectedUser[key]}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                    <Button
                        variant="outlined"
                        sx={{ m: 2, width: "20%", right: -16, bottom: -8 }}
                    >
                        Edit
                    </Button>
                </Grid>
                <Divider sx={{ mt: 4, mb: 1 }} />
                {/*Player Table*/}
                <Grid>
                    <div>TODO Table</div>
                </Grid>
            </Box>
        </div>
    );
};

export default PlayerInfoPage;
