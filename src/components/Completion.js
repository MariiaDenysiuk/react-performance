import React, { Component } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Grid from '@material-ui/core/Grid';
import Production from './Charts/Production';
import WaterOut from './Charts/WaterOut';
import RigsCrews from "./Charts/RigsCrews";
import TableUI from "./Table";
import API from "../api/API";

import Paper from '@material-ui/core/Paper';
import ReactVirtualizedTable from "./Tables/SimpleTable";


const tableRigs = API.getCrewsData().table;
const tableWaterOutProduction = API.getProductionWaterOut().table;
const drills = API.getDrillDataTable();


const chartStyle = {
    display: "flex",
    alignItems: "center"
};

export default class Completion extends Component {

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={4} spacing={3}>
                    <Paper style={{width: "100%", overflowX: 'auto'}}>
                        <div style={{marginLeft: "15px", paddingTop: "20px"}}>Completion Schedule</div>
                        <ReactVirtualizedTable header = {drills.header} body = {drills.body[0]} />
                        <div style={{marginLeft: "15px", paddingTop: "20px"}}>DUCs</div>
                        <ReactVirtualizedTable header = {drills.header} body = {drills.body[1]} />
                        <div style={{marginLeft: "15px", paddingTop: "20px"}}>Completed, Not Producing</div>
                        <ReactVirtualizedTable header = {drills.header} body = {drills.body[2]} />
                    </Paper>
                </Grid>

                <Grid item xs={8} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
                            {/* <TableUI tableData={{data: tableWaterOutProduction, tableName: 'Production'}} /> */}
                            {/*<SimpleTable header = {tableWaterOutProduction.header} body = {tableWaterOutProduction.body} />*/}
                            <ReactVirtualizedTable header = {tableWaterOutProduction.header} body = {tableWaterOutProduction.body}></ReactVirtualizedTable>
                        </Grid>
                        <Grid item xs={6} spacing={3} style={chartStyle} >
                            <Production />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
                            {/* <TableUI tableData={{data: tableWaterOutProduction, tableName: 'Water Out'}} /> */}
                            <ReactVirtualizedTable header = {tableWaterOutProduction.header} body = {tableWaterOutProduction.body}></ReactVirtualizedTable>
                        </Grid>
                        <Grid item xs={6} spacing={3} style={chartStyle} >
                            <WaterOut/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
                            {/* <TableUI tableData={{data: tableRigs, tableName: 'Rigs and Crews'}} /> */}
                            <ReactVirtualizedTable header = {tableRigs.header} body = {tableRigs.body}></ReactVirtualizedTable>
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
