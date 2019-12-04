import React, { Component } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Grid from '@material-ui/core/Grid';
import Production from './Charts/Production';
import WaterOut from './Charts/WaterOut';
import RigsCrews from "./Charts/RigsCrews";

export default class Financial extends Component {

    render() {
        return (
            <Grid container spacing={3}>
                <Production/>
                <Production/>
                <WaterOut/>
                <RigsCrews/>
            </Grid>
        );
    }
}
