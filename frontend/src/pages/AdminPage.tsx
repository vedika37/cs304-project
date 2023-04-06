import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Container from "@mui/material/Container";
import { Coach, GameSchedule, TrainingSchedule } from "../shared/types";
import Divider from "@mui/material/Divider";
import { Stack, Button } from "@mui/material";
import { createRoute } from "../shared/proxy";
import { useNavigate } from "react-router-dom";

// LOTS OF REFACTORING AND PROPER TYPING + ERROR HANDLING TO BE DONE BUT FUNCTIONS FOR NOW

function createData(
    scheduleID: string,
    startTime: Date,
    endTime: Date,
    season: string
    // type: GameSchedule | TrainingSchedule
) {
    return {
        scheduleID,
        startTime,
        endTime,
        season,
        // type,
    };
}

function createCoachData(
    coachID: string,
    name: string,
    phoneNumber: string,
    specialization: string
) {
    return {
        coachID,
        name,
        phoneNumber,
        specialization,
    };
}

// TODO REFACTOR ALL THESE DUPLICATED CODE
function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.scheduleID}
                </TableCell>
                <TableCell align="right">
                    {row.startTime.toDateString()}
                </TableCell>
                <TableCell align="right">
                    {row.endTime.toDateString()}
                </TableCell>
                <TableCell align="right">{row.season}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/* {Object.entries(row.type).map(([key, value], i) => {
                                return (
                                    <Typography key={i}>
                                        {key}: {value}
                                    </Typography>
                                );
                            })} */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function CoachRow(props: { row: ReturnType<typeof createCoachData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.coachID}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right">{row.specialization}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/* {Object.entries(row.type).map(([key, value], i) => {
                                return (
                                    <Typography key={i}>
                                        {key}: {value}
                                    </Typography>
                                );
                            })} */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function TeamRow(props: { row: ReturnType<typeof createTeamData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.teamName}
                </TableCell>
                <TableCell align="right">{row.playerCount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/* {Object.entries(row.type).map(([key, value], i) => {
                                return (
                                    <Typography key={i}>
                                        {key}: {value}
                                    </Typography>
                                );
                            })} */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function createTeamData(playerCount: number, teamName: string) {
    return {
        playerCount,
        teamName,
    };
}

function randomDate() {
    return new Date();
}

const testData = [
    // random test shedule
    // createData("S123", randomDate(), randomDate(), "season1", {
    //     groupName: "g1",
    //     league: "l1",
    // }),
    createData("S123", randomDate(), randomDate(), "season1"),
];

const testCoach = [createCoachData("S123", "S123", "S123", "season1")];

function CoachTable({ data }) {
    // data = testCoach;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">START</TableCell>
                        <TableCell align="right">END</TableCell>
                        <TableCell align="right">SEASON</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <CoachRow key={row.coachID} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const testTeamCountData = [createTeamData(1, "S123")];

function TeamTable({ data }) {
    // console.log(data);
    // data = [];
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>NAME</TableCell>
                        <TableCell align="right">PLAYER COUNT</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TeamRow key={row.teamName} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// //////////////////////////////////////////////////////////////////////////// REFACTOR THIS LATER //////

const AdminPage = () => {
    const [teamCountData, setTeamCountData] = useState<any[]>([]);
    const [coachData, setCoachData] = useState<Coach[] | []>([]);

    const refreshTeamCount = async () => {
        // setTeamCount(1);
        // todo error handling

        const res = await fetch(createRoute("playerCount"));

        const data = await res.json();
        // console.log(data);
        setTeamCountData(data);
    };

    const handleOpenCreatePopup = () => {
        console.log("create schedule popup");
    };

    const fetchCoaches = async () => {
        //try catch error handling todo

        const res = await fetch(createRoute("coaches"));

        const data: Coach[] = await res.json();
        // console.log(data);
        setCoachData(data);
    };

    const navigate = useNavigate();

    return (
        <Box>
            {/* <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">
                    TEAMS IN ORGANIZATION: {teamCount}
                </Typography>
                <Button onClick={refreshTeamCount} variant="outlined">
                    Refresh Team Count
                </Button>
            </Stack> */}
            <Button
                variant="contained"
                onClick={() => navigate("/admin/editor")}
            >
                EDITOR
            </Button>
            {/* COACHES */}
            <Divider sx={{ mt: 0, mb: 1 }} />
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Coaches</Typography>
                <Button onClick={fetchCoaches} variant="outlined">
                    Get all coaches
                </Button>
            </Stack>
            <Divider sx={{ mt: 0, mb: 1 }} />
            <Box
                sx={{
                    // border: "1px solid red",
                    overflowY: "auto",
                    minHeight: 200,
                    maxHeight: 500,
                }}
            >
                <CoachTable data={coachData} />
            </Box>
            <Divider sx={{ mt: 0, mb: 1 }} />
            {/* TEAMS */}
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">TEAMS</Typography>
                <Button onClick={refreshTeamCount} variant="outlined">
                    REFRESH PLAYER COUNT
                </Button>
            </Stack>
            <Divider sx={{ mt: 0, mb: 1 }} />
            <Box
                sx={{
                    // border: "1px solid red",
                    overflowY: "auto",
                    minHeight: 200,
                    maxHeight: 500,
                }}
            >
                <TeamTable data={teamCountData} />
            </Box>
        </Box>
    );
};

export default AdminPage;
