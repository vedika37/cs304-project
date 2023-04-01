import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import {
    Autocomplete,
    Box,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Season } from "../shared/types";

interface Data {
    rank: number;
    playerID: string;
    playerName: string;
    teamName: string;
    performancePoints: number;
}

interface ColumnData {
    dataKey: keyof Data;
    label: string;
    alignRight?: boolean;
    width: number;
}

function createData(
    rank: number,
    playerID: string,
    playerName: string,
    teamName: string,
    performancePoints: number
): Data {
    return {
        rank,
        playerID,
        playerName,
        teamName,
        performancePoints,
    };
}

const columns: ColumnData[] = [
    {
        width: 20,
        label: "Rank",
        dataKey: "rank",
    },
    {
        width: 20,
        label: "ID",
        dataKey: "playerID",
    },
    {
        width: 60,
        label: "Name",
        dataKey: "playerName",
    },
    {
        width: 60,
        label: "Team",
        dataKey: "teamName",
    },
    {
        width: 60,
        label: "Performance Points",
        dataKey: "performancePoints",
    },
];

const rows: Data[] = [];

const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table
            {...props}
            sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
        />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.alignRight || false ? "right" : "left"}
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: "background.paper",
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index: number, row: Data) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.alignRight || false ? "right" : "left"}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export default function RankingInfoPage() {
    const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);

    const [options, setOptions] = useState<Season[]>([]);

    const fetchOptions = async () => {
        // todo error handling
        const res = await fetch("http://localhost:3001/seasons");
        // console.log(res.status);
        if (res.status === 200) {
            const data = await res.json();
            // console.log(data);
            setOptions(data);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const handleSelectedChange = async (e: any, newValue: Season | null) => {
        // TODO run SELECT query for new value to pull most recent data
        setSelectedSeason(newValue);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">SELECT A SEASON</Typography>
                    </Box>
                    <Autocomplete
                        disablePortal
                        id="season-selection"
                        value={selectedSeason}
                        options={options}
                        onChange={handleSelectedChange}
                        sx={{ mt: 1, width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Season" />
                        )}
                    />
                </Stack>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <Paper style={{ height: "80vh", width: "100%" }}>
                    <TableVirtuoso
                        data={rows}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={rowContent}
                    />
                </Paper>
            </Box>
        </div>
    );
}
