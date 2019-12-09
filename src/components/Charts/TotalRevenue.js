import React, { Component } from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, styler } from "react-timeseries-charts";
import 'react-datasheet/lib/react-datasheet.css';
import _ from "underscore";
import Baseline from "../BaseLine";

const style = styler([
    { key: "oilRevenue", color: "orange", width: 2 },
    { key: "totalRevenue", color: "brown", width: 2 },
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

export default class TotalRevenues extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        tracker: null,
        timerange: this.props.data.point.range(),
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
        const range = this.state.timerange;

        const series = this.props.data.point;
        if (this.state.tracker) {
            const index = series.bisect(this.state.tracker);
            const trackerEvent = series.at(index);
        }

        return (
            <div style={{width: '100%', overflow: 'hidden'}}>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%'}}>

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
                            maxTime={series.range().end()}
                            minTime={series.range().begin()}
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
                                    label="Total Revenue and Oil Revenue"
                                    min={0.5}
                                    max={100995}
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
                                />
                                <Charts>
                                    <LineChart
                                        axis="y"
                                        breakLine={false}
                                        series={series}
                                        columns={["oilRevenue", "totalRevenue"]}
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
                    <div className="col-md-2" style={{fontSize: '14px', display: 'flex', justifyContent: 'flex-end', marginBottom: "20px"}}>
                        <span style={{color: 'orange'}}>--oilRevenue </span>
                        <span style={{color: 'brown'}}>--totalRevenue</span>
                        <span>{this.props.data.series}</span>
                    </div>
                </div>
            </div>


        );

    }
}
