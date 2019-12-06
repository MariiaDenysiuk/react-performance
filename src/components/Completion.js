import React, { Component } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Grid from '@material-ui/core/Grid';
import Production from './Charts/Production';
import WaterOut from './Charts/WaterOut';
import RigsCrews from "./Charts/RigsCrews";
import TableUI from "./Table";
import API from "../api/API";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const tableRigs = API.getCrewsData().table;
const tableProduction = API.getProduction().table;
const tableWaterOut = API.getWaterOut().table;
const drills = API.getDrillDataTable();

// const tableProduction1 = API.getDrillingSchedule().table;

const chartStyle = {
    display: "flex",
    alignItems: "center"
};


export default class Completion extends Component {

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={4} spacing={3}>
                    <div>
                    <Paper style={{width: "100%", overflowX: 'auto'}}>
                        <div style={{marginLeft: "15px", paddingTop: "20px"}}>Completion Schedule</div>
                        <Table aria-label="caption table" size="small">
                            <TableHead>
                                <TableRow>
                                    {drills.header.map(row => (
                                        <TableCell >{row}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {drills.body[0].map((row, i) => (
                                        <TableRow key={row[drills.header[0]]}>

                                            {drills.header.map((header, i) => (
                                            <TableCell component="th" scope="row">
                                                {row[header]}
                                             </TableCell>
                                            ))}

                                        </TableRow>

                                ))}
                            </TableBody>
                        </Table>


                        <div style={{marginLeft: "15px", paddingTop: "20px"}}>DUCs</div>
                        <Table aria-label="caption table" size="small">
                            <TableHead>
                                <TableRow>
                                    {drills.header.map(row => (
                                        <TableCell >{row}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {drills.body[1].map((row, i) => (
                                    <TableRow key={row[drills.header[0]]}>

                                        {drills.header.map((header, i) => (
                                            <TableCell component="th" scope="row">
                                                {row[header]}
                                            </TableCell>
                                        ))}

                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>


                        <div style={{marginLeft: "15px", paddingTop: "20px"}}>Completed, Not Producing</div>
                        <Table aria-label="caption table" size="small">
                            <TableHead>
                                <TableRow>
                                    {drills.header.map(row => (
                                        <TableCell >{row}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {drills.body[2].map((row, i) => (
                                    <TableRow key={row[drills.header[0]]}>

                                        {drills.header.map((header, i) => (
                                            <TableCell component="th" scope="row">
                                                {row[header]}
                                            </TableCell>
                                        ))}

                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>


                    </Paper>
                    </div>

                </Grid>
                <Grid item xs={8} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
                            <TableUI tableData={{data: tableProduction, tableName: 'Production'}} />
                        </Grid>
                        <Grid item xs={6} spacing={3} style={chartStyle} >
                            <Production />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
                            <TableUI tableData={{data: tableWaterOut, tableName: 'Water Out'}} />
                        </Grid>
                        <Grid item xs={6} spacing={3} style={chartStyle} >
                            <WaterOut/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
                            <TableUI tableData={{data: tableRigs, tableName: 'Rigs and Crews'}} />
                        </Grid>
                        <Grid item xs={6} spacing={3} style={chartStyle} >
                            <RigsCrews/>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        );
    }
}
