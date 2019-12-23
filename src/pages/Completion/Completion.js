import React, { Component } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import './Completion.css'
import Grid from '@material-ui/core/Grid';
import Production from '../../components/Charts/Production';
import WaterOut from '../../components/Charts/WaterOut';
import RigsCrews from "../../components/Charts/RigsCrews";
import API from "../../api/API";
import Paper from '@material-ui/core/Paper';
import ReactVirtualizedTable from "../../components/Tables/SimpleTable";

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
                        <div className="d-completion-header">Completion Schedule</div>
                        <ReactVirtualizedTable header = {drills.header} body = {drills.body[0]} />
                        <div className="d-completion-header">DUCs</div>
                        <ReactVirtualizedTable header = {drills.header} body = {drills.body[1]} />
                        <div className="d-completion-header">Completed, Not Producing</div>
                        <ReactVirtualizedTable header = {drills.header} body = {drills.body[2]} />
                    </Paper>
                </Grid>

                <Grid item xs={8} spacing={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
                            <ReactVirtualizedTable header = {tableWaterOutProduction.header} body = {tableWaterOutProduction.body}></ReactVirtualizedTable>
                        </Grid>
                        <Grid item xs={6} spacing={3} style={chartStyle} >
                            <Production />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
                            <ReactVirtualizedTable header = {tableWaterOutProduction.header} body = {tableWaterOutProduction.body}></ReactVirtualizedTable>
                        </Grid>
                        <Grid item xs={6} spacing={3} style={chartStyle} >
                            <WaterOut/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6} spacing={3}>
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
