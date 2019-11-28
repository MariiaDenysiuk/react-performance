import React, { Component } from 'react';
import { TimeSeries, TimeRange } from "pondjs";
import { format } from "d3-format";
import _ from "underscore";
import {Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, Legend, styler, MultiBrush} from "react-timeseries-charts";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const ActualProd = require('../api/testData/ActualProd.json');
const TotalProdImpact = require('../api/testData/TotalProdImpact.json');
const Count = require('../api/testData/count.json');

// let cols = Object.keys(TotalProdImpact[0]);
let points = [];
let points1 = [];
let points_count = [];
// for(let i in TotalProdImpact){
// 	let point = [];
// 	for (let j of cols){
// 		point.push(j==='Date'? Number(new Date(TotalProdImpact[i][j])) : parseFloat(TotalProdImpact[i][j]))	

// 	}
// 	points.push(point)
// }
function getPoints(data,points) {
	for(let i in data){
		let point = [];
		let cols = Object.keys(data[0]);
		for (let j of cols){
			point.push(j==='Date'? Number(new Date(data[i][j])) : parseFloat(data[i][j]));

		}
		points.push(point)
	}
	return points
}

points = getPoints(TotalProdImpact,points);
points_count = getPoints(Count,points_count);

// console.log(points_count);


for(let i in ActualProd){
	points1.push([Number(new Date(ActualProd[i].Date)), parseFloat(ActualProd[i].ACTUAL_PROD)]);
}


const series = new TimeSeries({
	name: "ActualProd",
	columns: ["time", "ACTUAL_PROD"],
	points: points1
});

const prodSeries = new TimeSeries({
    name: "Prod",
    columns: ["time", "ActualProd", "fracImpact", "prodWOI"],
    points: points
});

const countSeries = new TimeSeries({
    name: "Count",
    columns: ["time", "cumDrilled", "hzWellsFracd", "hzWellsProducing","drilledProducing","totalVertFracs"],
    points: points_count
});

// const style = styler([
//     { key: "Actual Prod", color: "red", width: 2 },
//     { key: "Frac Impact", color: "gray", width: 2 },
//     // { key: "Prod w/o Frac Impact", color: "orange", width: 2 }
// ]);
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

export default class Completion extends Component{
    state = {
        tracker: null,
        timerange: series.range(),
        x: null,
        y: null,
        selected: 1,
        selections: [
            // new TimeRange(1428292800000, 1437364800000),
            // new TimeRange(1460952000000, 1464580800000),
            new TimeRange(1489377600000, 1505102400000)
        ]
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

 	handleSelectionChange = (timerange, i) => {
        const selections = this.state.selections;
        selections[i] = timerange;
        this.setState({ selections });
    };

    handleMouseMove = (x, y) => {
        this.setState({ x, y });
    };

    render() {
        const f = format(".2s");
        const range = this.state.timerange;
        const max = _.max([prodSeries.max("ActualProd"), prodSeries.max("prodWOI")]);
        const min = _.min([prodSeries.min("ActualProd"), prodSeries.min("prodWOI")]);
        const formatter = format(".4s");

        let prodWOIValue, ActualProdValue, fracImpactValue,ACTUAL_PRODValue,cumDrilledValue,hzWellsFracdValue,
        hzWellsProducingValue,drilledProducingValue,totalVertFracsValue;
        if (this.state.tracker) {
            const index = prodSeries.bisect(this.state.tracker);
            const trackerEvent = prodSeries.at(index);
            const index1 = series.bisect(this.state.tracker);
            const trackerEvent1 = series.at(index1);
            const index2 = countSeries.bisect(this.state.tracker);
            const trackerEvent2 = series.at(index2);
            ActualProdValue = `${f(trackerEvent.get("ActualProd"))}`;
            prodWOIValue = `${f(trackerEvent.get("prodWOI"))}`;
            fracImpactValue = `${f(trackerEvent.get("fracImpact"))}`;
            ACTUAL_PRODValue = `${f(trackerEvent1.get("ACTUAL_PROD"))}`;
            cumDrilledValue = `${f(trackerEvent2.get("cumDrilled"))}`;
            hzWellsFracdValue = `${f(trackerEvent2.get("hzWellsFracd"))}`;
            hzWellsProducingValue = `${f(trackerEvent2.get("hzWellsProducing"))}`;
            drilledProducingValue = `${f(trackerEvent2.get("drilledProducing"))}`;
            totalVertFracsValue = `${f(trackerEvent2.get("totalVertFracs"))}`;
        }
        console.log(prodWOIValue, ActualProdValue, fracImpactValue,ACTUAL_PRODValue);
        console.log(cumDrilledValue,hzWellsFracdValue,
        hzWellsProducingValue,drilledProducingValue,totalVertFracsValue);

        return (
            <div className="doubleplot">
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer
	                            title="Total Prod Impact from Offset Fracs (MBOEPD)"
 	                    		titleStyle={{ fill: "white", fontWeight: 500 }}
                                timeRange={range}
                                format="%b '%y"
                   				timeAxisTickCount={10}
                                timeAxisStyle={{
                                    ticks: {
                                        stroke: "#AAA",
                                        opacity: 0.25,
                                        "stroke-dasharray": "1,1"
                                        // Note: this isn't in camel case because this is
                                        // passed into d3's style
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
                                onBackgroundClick={() => this.setState({ selection: null })}
                            >
                                <ChartRow height="300">
                                    <YAxis
                                        id="y"
                                        label="BOEPD"
                                        min={min}
                                        max={110000}
 	                            		format=".2s"
                                        style={{
                                            ticks: {
                                                stroke: "#AAA",
                                                opacity: 0.25,
                                                "stroke-dasharray": "1,1"
                                                // Note: this isn't in camel case because this is
                                                // passed into d3's style
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
                                            series={prodSeries}
                                            columns={["ActualProd", "prodWOI"]}
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
                                        <LineChart
                                            axis="y"
                                            breakLine={false}
                                            series={series}
                                            columns={["ACTUAL_PROD"]}
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
                                        <LineChart
                                            axis="y1"
                                            breakLine={false}
                                            series={prodSeries}
                                            columns={["fracImpact"]}
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
                                        <MultiBrush
                                            timeRanges={this.state.selections}
                                            style={i => {
                                                if (i === this.state.selected) {
                                                    return { fill: "#46abff" };
                                                } else {
                                                    return { fill: "#cccccc" };
                                                }
                                            }}
                                            allowSelectionClear
                                            onTimeRangeChanged={this.handleSelectionChange}
                                            onTimeRangeClicked={i => this.setState({ selected: i })}
                                        />                       
                                    </Charts>
                                    <YAxis
                                        id="y1"
                                        min={0}
                                        max={12000}
 	                            		format=".2s"
                                        style={{
                                            ticks: {
                                                stroke: "#AAA",
                                                opacity: 0.25,
                                                "stroke-dasharray": "1,1"
                                                // Note: this isn't in camel case because this is
                                                // passed into d3's style
                                            }
                                        }}
                                        hideAxisLine
                                        width="60"
                                        type="linear"
                                        
                                    />
                                </ChartRow>
                                     <ChartRow height="300">
                                    <YAxis
                                        id="y"
                                        label="Count"
                                        min={0}
                                        max={150}
 	                            		format=".2s"
                                        style={{
                                            ticks: {
                                                stroke: "#AAA",
                                                opacity: 0.25,
                                                "stroke-dasharray": "1,1"
                                                // Note: this isn't in camel case because this is
                                                // passed into d3's style
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
                                            series={countSeries}
                                            columns={["cumDrilled", "hzWellsFracd","hzWellsProducing","drilledProducing","totalVertFracs"]}
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
                                        <LineChart
                                            axis="y1"
                                            breakLine={false}
                                            series={series}
                                            columns={["ACTUAL_PROD"]}
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
                                        <MultiBrush
                                            timeRanges={this.state.selections}
                                            style={i => {
                                                if (i === this.state.selected) {
                                                    return { fill: "#46abff" };
                                                } else {
                                                    return { fill: "#cccccc" };
                                                }
                                            }}
                                            allowSelectionClear
                                            onTimeRangeChanged={this.handleSelectionChange}
                                            onTimeRangeClicked={i => this.setState({ selected: i })}
                                        />                       
                                    </Charts>
                                    <YAxis
                                        id="y1"
                                        min={15000}
                                        max={75000}
 	                            		format=".2s"
                                        style={{
                                            ticks: {
                                                stroke: "#AAA",
                                                opacity: 0.25,
                                                "stroke-dasharray": "1,1"
                                                // Note: this isn't in camel case because this is
                                                // passed into d3's style
                                            }
                                        }}
                                        hideAxisLine
                                        width="60"
                                        type="linear"
                                        
                                    />
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>
                            <Legend
                                type="line"
                                align="left"
                                style={style}
                                labelStyle={{color: "white" }}
                                highlight={this.state.highlight}
                                onHighlightChange={highlight => this.setState({ highlight })}
                                selection={this.state.selection}
                                onSelectionChange={selection => this.setState({ selection })}
                                categories={[
                                    { key: "ActualProd", label: "Actual Prod", value: ActualProdValue},
                                    { key: "fracImpact", label: "Frac Impact", value: fracImpactValue },
                                    { key: "prodWOI", label: "PROD w/o Frac Impact", value: prodWOIValue },                       
                                    { key: "ACTUAL_PROD", label: "ACTUAL PROD", value: ACTUAL_PRODValue },
                                    { key: "cumDrilled", label: "Total Hz Drilled Count", value: cumDrilledValue},
                                    { key: "hzWellsFracd", label: "Total Hz Frac'd Well Count", value: hzWellsFracdValue },
                                    { key: "hzWellsProducing", label: "Total Hz Producing Well Count", value: hzWellsProducingValue },                       
                                    { key: "drilledProducing", label: "Drilled Hz Minus Producing Hz", value: drilledProducingValue },
                                    { key: "totalVertFracs", label: "Vertical Well Fracs", value: totalVertFracsValue },
                                ]}
                            />
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
	                    <table className="table">
	                        <thead>
	                            <tr style={{ color:'white'}}>
	                                <th scope="col">Date Range</th>
	                                <th scope="col">Actions</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                                {this.state.selections.map((tr, i) => {
	                                    return (
	                                        <tr
	                                            key={i}
	                                            style={
	                                                i === this.state.selected
	                                                    ? { background: "#46abff60" }
	                                                    : {}
	                                            }
	                                        >
	                                            <td
	                                                onClick={() => this.setState({ selected: i })}
	                                                style={{ color:'white'}}
	                                            >{`${tr.humanize()}`}</td>
	                                            <td style={{ color:'white'}}>
	                                                <i
	                                                    className="glyphicon glyphicon-remove"
	                                                    style={{ cursor: "pointer" }}
	                                                    onClick={() => {
	                                                        const selection = this.state.selections;
	                                                        this.setState({
	                                                            selections: selection.filter(
	                                                                (item, j) => j !== i
	                                                            ),
	                                                            selected: null
	                                                        });
	                                                    }}
	                                                />
	                                            </td>
	                                        </tr>
	                                    );
	                                })}
	                        </tbody>
	                    </table>
	                </div>
                </div>

            </div>
        );
    }
}
