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
    Button,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Season, SeasonOption } from "../shared/types";
import { createRoute } from "../shared/proxy";
import { create } from "@mui/material/styles/createTransitions";

interface Data {
    rank: number;
    playerID: string;
    playerName: string;
    teamName: string;
    // performancePoints: number;
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
    teamName: string
    // performancePoints: number
): Data {
    return {
        rank,
        playerID,
        playerName,
        teamName,
        // performancePoints,
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
    // {
    //     width: 60,
    //     label: "Performance Points",
    //     dataKey: "performancePoints",
    // },
];

type Sample = [string, number, number, number, number];

const sample: readonly Sample[] = [
    ["Frozff yoghurt", 159, 6.0, 24, 4.0],
    ["Ice cream sandwich", 237, 9.0, 37, 4.3],
    ["Eclair", 262, 16.0, 24, 6.0],
    ["Cupcake", 305, 3.7, 67, 4.3],
    ["Gingerbread", 356, 16.0, 49, 3.9],
];

//type this
// const rows: Data[] = Array.from({ length: 5 }, (_, index) => {
//     const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//     return createData(index, ...randomSelection);
// });

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

type RankingData = {
    playerID: string;
    name: string;
    rankNumber: number;
    teamName: string;
};

export default function RankingInfoPage() {
    const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);

    const [options, setOptions] = useState<SeasonOption[]>([]);

    const [rankingData, setRankingData] = useState<RankingData[] | null>(null);

    const fetchOptions = async () => {
        // todo error handling
        const res = await fetch(createRoute("options/seasons"));
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

    const handleSelectedChange = async (
        e: any,
        newValue: SeasonOption | null
    ) => {
        // TODO run SELECT query for new value to pull most recent data
        setSelectedSeason(newValue);

        try {
            const res = await fetch(
                createRoute(`rankings/${newValue?.season}`)
            );

            // status handling goes here

            const data: RankingData[] = await res.json();

            // console.log(data);
            setRankingData(data);
        } catch (e) {}
    };

    function logState() {
        console.log("selected season:", selectedSeason);
    }

    //todo fix typing
    // quick hack todo reimplement
    const rows: Data[] | [] = rankingData
        ? Array.from({ length: rankingData?.length }, (_, index) => {
              // console.log(index);
              //   console.log(rankingData[index]);
              if (rankingData)
                  return createData(
                      rankingData[index].rankNumber,
                      rankingData[index].playerID,
                      rankingData[index].name,
                      rankingData[index].teamName
                  );
          })
        : [];

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {/* <Button variant="contained" onClick={logState}>
                    log
                </Button> */}
                <Stack direction="row" justifyContent="space-between">
                    <Box display="flex" alignItems="end">
                        <Typography variant="h6">SELECT A SEASON</Typography>
                    </Box>
                    <Autocomplete
                        disablePortal
                        id="season-selection"
                        value={selectedSeason}
                        options={options}
                        getOptionLabel={(option) => option.season}
                        isOptionEqualToValue={(option, value) =>
                            option.season === value.season
                        }
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
