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
import InsertCoachForm from "../components/InsertCoachForm";
import UpdateCoachForm from "../components/UpdateCoachForm";
import DeleteSpecializationForm from "../components/DeleteSpecializationForm";

const AdminEditorPage = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {/* INSERT */}
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">INSERT A COACH</Typography>
                    </Box>
                </Stack>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <InsertCoachForm />
                <Divider sx={{ mt: 2, mb: 1 }} />
                {/* UPDATE */}
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">UPDATE A COACH</Typography>
                    </Box>
                </Stack>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <UpdateCoachForm />
                <Divider sx={{ mt: 2, mb: 1 }} />
                {/* DELETE A SPECIALIZATION */}
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">
                            DELETE A SPECIALIZATION
                        </Typography>
                    </Box>
                </Stack>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <DeleteSpecializationForm />
                <Divider sx={{ mt: 2, mb: 1 }} />
                {/*  */}
            </Box>
        </div>
    );
};

export default AdminEditorPage;
