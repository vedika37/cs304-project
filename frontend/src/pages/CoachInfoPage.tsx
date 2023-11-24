import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import {
    UserContextType,
    ViewContextType,
    View,
    Coach,
    CoachObj,
    CoachOption,
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
import ScheduleTable from "../components/ScheduleTable";

interface CIProps {
    coach: Coach | null;
    ctx: any;
}

const CoachInfo = ({ coach, ctx }: CIProps) => {
    // console.log(ctx);

    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 6, md: 12 }}
        >
            {Object.entries(CoachObj).map(([key, value], i) => {
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
                                    {coach && coach[key as keyof Coach]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
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

const CoachInfoPage = () => {
    const { isAuthenticated, user } = useContext(
        UserContext
    ) as UserContextType;

    const { view } = useContext(ViewContext) as ViewContextType;

    // tmp user for testing
    const tmpCoach: Coach = {
        coachID: "C999",
        name: "TEST",
        phoneNumber: "Test",
        specialization: "Test",
    };

    const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
    const [options, setOptions] = useState<CoachOption[]>([]);
    const [showSchdules, setShowSchedules] = useState<boolean>(false);
    const [scheduleData, setScheduleData] = useState<Coach[]>([]);

    const fetchOptions = async () => {
        // todo error handling
        const res = await fetch(createRoute("options/coaches"));
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
        newValue: CoachOption | null
    ) => {
        // console.log(newValue);
        displaySchedules(false);

        if (!newValue) {
            setSelectedCoach(null);
            // displaySchedules(false);
            return;
        }

        try {
            const res = await fetch(
                createRoute(`coaches/${newValue?.coachID}`)
            );

            const data: Coach = await res.json();

            setSelectedCoach(data);
            // displaySchedules(false);
        } catch (e) {
            console.log(e);
        }

        // setSelectedCoach(newValue);
    };

    const displaySchedules = async (show: boolean) => {
        // console.log("displaying schedules", showSchdules);
        if (selectedCoach) {
            try {
                const res = await fetch(
                    createRoute(`sportsSchedule/${selectedCoach.coachID}`)
                );

                // res handling

                const data = await res.json();
                // console.log(data);
                setScheduleData(data);

                setShowSchedules(show);
            } catch (e) {}
        }
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {isAuthenticated && view === View.Coach && (
                    <>
                        <Typography variant="h6">MY PROFILE</Typography>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <CoachInfo coach={tmpCoach} ctx={{ edit: true }} />
                        <Divider sx={{ mt: 2, mb: 1 }} />
                    </>
                )}
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">SELECT A COACH</Typography>
                    </Box>
                    <Autocomplete
                        disablePortal
                        id="coach-selection"
                        value={selectedCoach}
                        options={options}
                        getOptionLabel={(option) => option.name}
                        onChange={handleSelectedChange}
                        isOptionEqualToValue={(option, value) =>
                            option.coachID === value.coachID
                        }
                        sx={{ mt: 1, width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Coach" />
                        )}
                    />
                </Stack>
                <Divider sx={{ mt: 1, mb: 1 }} />
                {/*Selected Coach Info*/}
                <CoachInfo
                    coach={selectedCoach}
                    ctx={
                        view === View.Admin && selectedCoach
                            ? { edit: true }
                            : { edit: false }
                    }
                />

                <Divider sx={{ mt: 2, mb: 1 }} />
                {/*Coach Table*/}
                <Grid>
                    {/* <Typography variant="h6">TODO</Typography> */}
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (selectedCoach) {
                                displaySchedules(true);
                            } else {
                                alert("Please select a coach");
                            }
                        }}
                    >
                        Display Schedules
                    </Button>
                </Grid>
                <Divider sx={{ mt: 1, mb: 1 }} />
                {showSchdules && <ScheduleTable data={scheduleData} />}
            </Box>
        </div>
    );
};

export default CoachInfoPage;
