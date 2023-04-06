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

function FormPropsTextFields() {
    const [newCoach, setNewCoach] = useState<Coach>({
        coachID: "",
        name: "",
        phoneNumber: "",
        specialization: "",
    });

    const handleInsertCoachSubmit = async () => {
        if (!newCoach) {
            alert("Please check your inputs and try again");
            return;
        }
        console.log("inserting coach");
        console.log(JSON.stringify(newCoach));
        // todo error handling
        const res = await fetch(createRoute("coaches"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCoach),
        });

        // return message todo
    };

    function logInsertData() {
        console.log("coachID:", newCoach.coachID);
        console.log("name:", newCoach.name);
        console.log("phoneNumber:", newCoach.phoneNumber);
        console.log("specialization:", newCoach.specialization);
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
                    value={newCoach.coachID}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setNewCoach({ ...newCoach, coachID: e.target.value });
                    }}
                />
                <TextField
                    required
                    id="coach-name"
                    label="Name"
                    value={newCoach.name}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setNewCoach({ ...newCoach, name: e.target.value });
                    }}
                />
                <TextField
                    required
                    id="coach-phone-number"
                    label="Phone Number"
                    value={newCoach.phoneNumber}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setNewCoach({
                            ...newCoach,
                            phoneNumber: e.target.value,
                        });
                    }}
                />
                <TextField
                    required
                    id="coach-specialization"
                    label="Specialization"
                    value={newCoach.specialization}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setNewCoach({
                            ...newCoach,
                            specialization: e.target.value,
                        });
                    }}
                />
            </div>
            <Stack direction="row" justifyContent="space-between">
                <Button variant="outlined" onClick={logInsertData}>
                    Log
                </Button>
                <div className="spacing"></div>
                <Button variant="contained" onClick={handleInsertCoachSubmit}>
                    Submit
                </Button>
            </Stack>
        </Box>
    );
}

const AdminEditorPage = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">INSERT A COACH</Typography>
                    </Box>
                </Stack>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <FormPropsTextFields />
                <Divider sx={{ mt: 2, mb: 1 }} />
            </Box>
        </div>
    );
};

export default AdminEditorPage;
