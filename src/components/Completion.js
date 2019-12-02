import React, { Component } from 'react';
import { TimeSeries, TimeRange } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, styler } from "react-timeseries-charts";
import 'react-datasheet/lib/react-datasheet.css';
import API from "../api/API";
import TableUI from "./Table";
import Grid from '@material-ui/core/Grid';

//-------------------charts-----------------

const seriesRigs = new TimeSeries({
    name: "CrewsRigs",
    columns: ["time", "value"],
    points: API.getRigsData().chart
});

const seriesCrews = new TimeSeries({
    name: "CrewsRigs",
    columns: ["time", "value"],
    points: API.getCrewsData().chart
});

const seriesWater = new TimeSeries({
    name: "Water",
    columns: ["time", "value"],
    points: API.getWaterOut().chart
});

const seriesProduction = new TimeSeries({
    name: "Production",
    columns: ["time", "value"],
    points: API.getProduction().chart
});


//-----------------tables----------------
const tableRigs = API.getRigsData().table;

const tableWater = API.getWaterOut().table;
const tableProduction = API.getProduction().table;


const style = styler([
    { key: "ActualProd", color: "red", width: 2 },
    { key: "fracImpact", color: "gray", width: 2 },
    { key: "prodWOI", color: "#ffd700", width: 2 },
    { key: "ACTUAL_PROD", color: "#b19cd9", width: 2 },
    { key: "cumDrilled", color: "#0000ff", width: 2 },
    { key: "hzWellsFracd", color: "orange", width: 2 },
    { key: "hzWellsProducing", color: "#5fafff", width: 2 },
    { key: "drilledProducing", color: "green", width: 2 },
    { key: "totalVertFracs", color: "brown", width: 2 },
]);


const styleRigs = {
    value: {
        stroke: "#a04c9c",
        opacity: 0.2
    }
};

const styleCrews = {
    value: {
        stroke: "#a02c2c",
        opacity: 0.2
    }
};


const chartStyle = {
    display: "flex",
    alignItems: "center"
};

export default class Completion extends Component{
    render() {
        return (
            <div >
                <Grid container spacing={3}>
                    <Grid item xs={6} spacing={3}>
                        <TableUI tableData={tableRigs} />
                    </Grid>
                    <Grid item xs={6} spacing={3} style={chartStyle} >
                        <ChartContainer timeRange={seriesRigs.range()} format="%b '%y">
                            <ChartRow height="150">
                                <YAxis
                                    id="rigs"
                                    label="RigsCrews"
                                    min={seriesRigs.min()}
                                    max={seriesRigs.max()}
                                    width="60"
                                    format=",.2f"
                                />
                                <Charts>
                                    <LineChart axis="rigs" series={seriesRigs} style={styleRigs} />
                                    <LineChart axis="rigs" series={seriesCrews} style={styleCrews} />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6} spacing={3}>
                        <TableUI tableData={tableWater} />
                    </Grid>
                    <Grid item xs={6} spacing={3} style={chartStyle}>
                        <ChartContainer timeRange={seriesWater.range()} format="%b '%y">
                            <ChartRow height="150">
                                <YAxis
                                    id="rigs"
                                    label="WaterOut"
                                    min={seriesWater.min()}
                                    max={seriesWater.max()}
                                    width="60"
                                    format=",.2f"
                                />
                                <Charts>
                                    <LineChart axis="rigs" series={seriesWater} />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Grid>
                </Grid>

                <Grid container spacing={3} >
                    <Grid item xs={6} spacing={3} >
                        <TableUI tableData={tableProduction} />
                    </Grid>
                    <Grid item xs={6} spacing={3} style={chartStyle}>
                        <ChartContainer timeRange={seriesProduction.range()} format="%b '%y">
                            <ChartRow height="150">
                                <YAxis
                                    id="rigs"
                                    label="Production"
                                    min={seriesProduction.min()}
                                    max={seriesProduction.max()}
                                    width="60"
                                    format=",.2f"
                                />
                                <Charts>
                                    <LineChart axis="rigs" series={seriesProduction} />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Grid>
                </Grid>

            </div>
        );

    }
}
