import React, { Component } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Grid from '@material-ui/core/Grid';
import Production from './Charts/Production';
import WaterOut from './Charts/WaterOut';
import RigsCrews from "./Charts/RigsCrews";
import TableUI from "./Table";
import API from "../api/API";

const tableRigs = API.getCrewsData().table;
const tableProduction = API.getProduction().table;
const tableWaterOut = API.getWaterOut().table;

const chartStyle = {
    display: "flex",
    alignItems: "center"
};

export default class Completion extends Component {

    render() {
        return (
            <Grid container spacing={3}>

                <Grid container spacing={3}>
                    <Grid item xs={6} spacing={3}>
                        <TableUI tableData={{data: tableProduction, tableName: 'Production'}} />
                    </Grid>
                    <Grid item xs={6} spacing={3} style={chartStyle} >
                        <Production/>
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
        );
    }
}
