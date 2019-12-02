import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ChartContainer, ChartRow, Charts, LineChart, YAxis} from "react-timeseries-charts";
import API from "../api/API";
import {TimeRange} from "pondjs";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

export default function ChartUI() {

    state = {
        tracker: null,
        x: null,
        y: null,
        selected: 1,
        data: API.getData(),
        selections: [
            new TimeRange(1489377600000, 1505102400000)
        ]
    };

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
                    <LineChart axis="rigs" series={series} />
                </Charts>
            </ChartRow>
        </ChartContainer>
    );
}
