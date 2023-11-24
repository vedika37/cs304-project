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
import TextField from "@mui/material/TextField";

const UpdateCoachForm = () => {
    const [updCoach, setUpdCoach] = useState<Coach>({
        coachID: "",
        name: "",
        phoneNumber: "",
        specialization: "",
    });

    const handleUpdateCoachSubmit = async () => {
        if (!updCoach) {
            alert("Please check your inputs and try again");
            return;
        }
        console.log("inserting coach");
        console.log(JSON.stringify(updCoach));
        // todo error handling
        const res = await fetch(createRoute(`coaches/${updCoach.coachID}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updCoach),
        });

        // return message todo
    };

    function logInsertData() {
        console.log("coachID:", updCoach.coachID);
        console.log("name:", updCoach.name);
        console.log("phoneNumber:", updCoach.phoneNumber);
        console.log("specialization:", updCoach.specialization);
    }

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="coach-id"
                    label="CoachID"
                    value={updCoach.coachID}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setUpdCoach({ ...updCoach, coachID: e.target.value });
                    }}
                />
                <TextField
                    required
                    id="coach-name"
                    label="Name"
                    value={updCoach.name}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setUpdCoach({ ...updCoach, name: e.target.value });
                    }}
                />
                <TextField
                    required
                    id="coach-phone-number"
                    label="Phone Number"
                    value={updCoach.phoneNumber}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setUpdCoach({
                            ...updCoach,
                            phoneNumber: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    id="coach-specialization"
                    label="Specialization"
                    value={updCoach.specialization}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setUpdCoach({
                            ...updCoach,
                            specialization: e.target.value,
                        });
                    }}
                />
            </div>
            <Stack direction="row" justifyContent="space-between">
                {/* <Button variant="outlined" onClick={logInsertData}>
                    Log
                </Button> */}
                <div className="spacing"></div>
                <Button variant="contained" onClick={handleUpdateCoachSubmit}>
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default UpdateCoachForm;
