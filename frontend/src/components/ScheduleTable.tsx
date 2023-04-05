import * as React from "react";
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
import { GameSchedule, TrainingSchedule } from "../shared/types";
import Divider from "@mui/material/Divider";
import { Stack, Button } from "@mui/material";

function createData(
    scheduleID: string,
    startTime: string,
    endTime: string,
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
                <TableCell align="right">{row.startTime}</TableCell>
                <TableCell align="right">{row.endTime}</TableCell>
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

function randomDate() {
    return new Date();
}

const data = [
    // random test shedule
    // createData("S123", randomDate(), randomDate(), "season1", {
    //     groupName: "g1",
    //     league: "l1",
    // }),
    createData("S123", randomDate(), randomDate(), "season1"),
];

function STable({ data }) {
    // this isnt typed properly for now
    const tableData = data.map((data) =>
        createData(data.scheduleID, data.startTime, data.endTime, data.season)
    );

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
                    {tableData.map((row) => (
                        <Row key={row.scheduleID} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// type this later
const ScheduleTable = ({ data }) => {
    const handleOpenCreatePopup = () => {
        console.log("create schedule popup");
    };

    function logData() {
        console.log(data);
    }
    // console.log(data);

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Schedules</Typography>
                {/* <Button onClick={handleOpenCreatePopup} variant="outlined">
                    CREATE
                </Button> */}
                {/* <Button onClick={logData} variant="outlined">
                    logData
                </Button> */}
            </Stack>
            <Divider sx={{ mt: 0, mb: 1 }} />
            <Box
                sx={{
                    // border: "1px solid red",
                    overflowY: "auto",
                    minHeight: 500,
                    maxHeight: 500,
                }}
            >
                <STable data={data} />
            </Box>
        </Box>
    );
};

export default ScheduleTable;
