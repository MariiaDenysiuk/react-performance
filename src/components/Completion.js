import React, { Component } from 'react';
import { TimeSeries, TimeRange } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, styler } from "react-timeseries-charts";
import 'react-datasheet/lib/react-datasheet.css';
import API from "../api/API";


const series = new TimeSeries({
    name: "Crews",
    columns: ["time", "value"],
    points: API.getRigsCrewsData().crews.reverse()
});

const series1 = new TimeSeries({
    name: "Rigs",
    columns: ["time", "value"],
    points: API.getRigsCrewsData().rigs.reverse()
});

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

export default class Completion extends Component{
    state = {
        tracker: null,
        timerange: series.range(),
        x: null,
        y: null,
        selected: 1,
        selections: [
            new TimeRange(1489377600000, 1505102400000)
        ]
    };

    render() {
        return (
            <ChartContainer timeRange={series.range()} format="%b '%y">
                <ChartRow height="150">
                    <YAxis
                        id="rigs"
                        label=""
                        min={series.min()}
                        max={series.max()}
                        width="60"
                        format=",.2f"
                    />
                    <Charts>
                        <LineChart axis="rigs" series={series} />
                        <LineChart axis="rigs" series={series1} />
                    </Charts>
                </ChartRow>

            </ChartContainer>
        );

    }
}
