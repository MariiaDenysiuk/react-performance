import React, { Component } from 'react';
import { TimeSeries } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, styler } from "react-timeseries-charts";
import 'react-datasheet/lib/react-datasheet.css';
import API from "../api/API";
import TableUI from "./Table";
import Grid from '@material-ui/core/Grid';
import _ from "underscore";
import { format } from "d3-format";
import Baseline from "./BaseLine";


//-------------------charts-----------------
function buildPoints() {
    const production = API.getProduction().chart.production;
    let points = [];
    for (let i = 0; i < production.length; i++) {
        points.push([production[i][0], production[i][1]]);
    }
    console.log(points);
    return points;
}

const seriesProduction = new TimeSeries({
    name: "Production",
    columns: ["time", "production"],
    points: buildPoints()
});

//-----------------tables----------------
const tableRigs = API.getProduction().table;

const style = styler([
    { key: "production", color: "red", width: 2 },
]);


class CrossHairs extends React.Component {
    render() {
        const { x, y } = this.props;

        const style = { pointerEvents: "none", stroke: "#ccc" };
        if (!_.isNull(x) && !_.isNull(y)) {
            return (
                <g>
                    <line style={style} x1={0} y1={y} x2={this.props.width} y2={y} />
                    <line style={style} x1={x} y1={0} x2={x} y2={this.props.height} />
                </g>
            );
        } else {
            return <g />;
        }
    }
}

const chartStyle = {
    display: "flex",
    alignItems: "center"
};

export default class Production extends Component {

    state = {
        tracker: null,
        timerange: seriesProduction.range(),
        x: null,
        y: null
    };

    handleTrackerChanged = tracker => {
        if (!tracker) {
            this.setState({ tracker, x: null, y: null });
        } else {
            this.setState({ tracker });
        }
    };

    handleTimeRangeChange = timerange => {
        this.setState({ timerange });
    };

    handleMouseMove = (x, y) => {
        this.setState({ x, y });
    };

    render() {
        const f = format("$,.2f");
        const range = this.state.timerange;

        if (this.state.tracker) {
            const index = seriesProduction.bisect(this.state.tracker);
            const trackerEvent = seriesProduction.at(index);
        }

        return (
            <Grid container spacing={3}>
                    <Grid item xs={6} spacing={3}>
                        <TableUI tableData={{data: tableRigs, tableName: 'Production'}} />
                    </Grid>
                    <Grid item xs={6} spacing={3} style={chartStyle} >
                        <div>
                            <div className="row">
                                <div className="col-md-12">
                                    <ChartContainer
                                        timeRange={range}
                                        timeAxisStyle={{
                                            ticks: {
                                                stroke: "#AAA",
                                                opacity: 0.25,
                                                "stroke-dasharray": "1,1"
                                            },
                                            values: {
                                                fill: "#AAA",
                                                "font-size": 12
                                            }
                                        }}
                                        showGrid={true}
                                        paddingRight={100}
                                       
                                        timeAxisAngledLabels={true}
                                        timeAxisHeight={65}
                                        onTrackerChanged={this.handleTrackerChanged}
                                        onBackgroundClick={() => this.setState({ selection: null })}
                                        enablePanZoom={true}
                                        onTimeRangeChanged={this.handleTimeRangeChange}
                                        onMouseMove={(x, y) => this.handleMouseMove(x, y)}
                                        minDuration={1000 * 60 * 60 * 24 * 30}
                                    >
                                        <ChartRow height="300">
                                            <YAxis
                                                id="y"
                                                label="Production"
                                                min={0}
                                                max={180050}
                                                style={{
                                                    ticks: {
                                                        stroke: "#AAA",
                                                        opacity: 0.25,
                                                        "stroke-dasharray": "1,1"
                                                    }
                                                }}
                                                showGrid
                                                hideAxisLine
                                                width="60"
                                                type="linear"
                                                format=",.2f"
                                            />
                                            <Charts>
                                                <LineChart
                                                    axis="y"
                                                    breakLine={false}
                                                    series={seriesProduction}
                                                    columns={["production"]}
                                                    style={style}
                                                    interpolation="curveBasis"
                                                    highlight={this.state.highlight}
                                                    onHighlightChange={highlight =>
                                                        this.setState({ highlight })
                                                    }
                                                    selection={this.state.selection}
                                                    onSelectionChange={selection =>
                                                        this.setState({ selection })
                                                    }
                                                />
                                                <CrossHairs x={this.state.x} y={this.state.y} />
                                                <Baseline
                                                    axis="y"
                                                    value={1.0}
                                                    label="Baseline"
                                                    position="right"
                                                />
                                            </Charts>
                                        </ChartRow>
                                    </ChartContainer>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <p style={{color: 'red', margin: 0}}>--rigs</p>
                                    <p style={{color: 'gray', margin: 0}}>--crews</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
            </Grid>
        );

    }
}
