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

const DeleteSpecializationForm = () => {
    const [spec, setSpec] = useState<string>("");

    const handleDeleteSpecialization = async () => {
        if (
            confirm(
                "This will all delete all the coaches with the specialization!"
            )
        ) {
            if (!spec) {
                alert("Please check your inputs and try again");
                return;
            }
            console.log("inserting coach");
            console.log(JSON.stringify(spec));
            // todo error handling
            const res = await fetch(createRoute(`specialization/${spec}`), {
                method: "DELETE",
            });
        }

        // return message todo
    };

    function logDeleteSpecData() {
        console.log("specialization:", spec);
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
                    id="specialization"
                    label="Specialization"
                    value={spec}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setSpec(e.target.value);
                    }}
                />
            </div>
            <Stack direction="row" justifyContent="space-between">
                {/* <Button variant="outlined" onClick={logDeleteSpecData}>
                    Log
                </Button> */}
                <div className="spacing"></div>
                <Button
                    variant="contained"
                    onClick={handleDeleteSpecialization}
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default DeleteSpecializationForm;
