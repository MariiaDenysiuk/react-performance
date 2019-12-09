import React from 'react';
import MaterialTable, { MTableCell } from 'material-table';
import Grid from '@material-ui/core/Grid';
import Production from "./Charts/Production";
import WaterOut from "./Charts/WaterOut";
import RigsCrews from "./Charts/RigsCrews";
import TotalRevenues from "./Charts/TotalRevenue";
import API from '../api/API';
import { TimeSeries } from 'pondjs';

const financialData = API.getFiancial();

function totalRevenue(x, y, state, currentName) {
   const mult = x.map((el, i) => el * +y[i]);
    state.data2.map((el, i) => {
       if(el.price_name.includes(currentName)) {
           state.data2[i].date1 = mult[0].toFixed(2);
           state.data2[i].date2 = mult[1].toFixed(2);
           state.data2[i].date3 = mult[2].toFixed(2);
       }
    });
}

function sumRevenue(state) {
  let sum = {};
  const currenData = JSON.parse(JSON.stringify(state));
  currenData.columns.map((col, i) => {
      if(i !== 0 ) {
        currenData.data2.map((dat, j) => {
         if(dat.price_name !== 'Total Revenue') {
           if(!sum.hasOwnProperty(col.field)) { 
             sum[col.field] = 0
          }
          sum[col.field] = +sum[col.field] + +dat[col.field];   
        } 
        })
      }
  });

  state.data2[state.data2.length - 1]['date1'] = sum['date1'];
  state.data2[state.data2.length - 1]['date2'] = sum['date2'];
  state.data2[state.data2.length - 1]['date3'] = sum['date3'];
  return sum;
}

function totalMboe(state) {
    let totalMboe = {};
    const currenData = JSON.parse(JSON.stringify(state));
    currenData.columns.map((col, i) => {
        if(i !== 0 ) {
            currenData.data1.map((dat, j) => {
                if(dat.price_name !== 'Total(Mboe)' || dat.price_name !== 'Total(Mboepd)') {
                    if(!totalMboe.hasOwnProperty(col.field)) {
                        totalMboe[col.field] = 0
                    }

                    const mboe =( j === 0) ? +dat[col.field]/6 : +dat[col.field];
                    console.log(mboe);
                    totalMboe[col.field] =  +totalMboe[col.field] + +mboe.toFixed(2);
                }
            })
        }
    });

    state.data1[state.data1.length - 2]['date1'] = totalMboe['date1'];
    state.data1[state.data1.length - 2]['date2'] = totalMboe['date2'];
    state.data1[state.data1.length - 2]['date3'] = totalMboe['date3'];
}

function buildPoints(props) {
    const kon = JSON.parse(JSON.stringify(props));
    let revenue = API.getRevenue(kon);

    const oilRevenue = revenue.oilRevenue;
    const totalRevenue = revenue.totalRevenue;
    let points = [];
    for (let i = 0; i < oilRevenue.length; i++) {
        points.push([oilRevenue[i][0], oilRevenue[i][1], totalRevenue[i][1]]);
    }

    return new TimeSeries({
        name: "Total Revenue and Oil revenue",
        columns: ["time", "oilRevenue", "totalRevenue"],
        points: points
    });
}


function findData(findIn, item) {
    const curretItem = item;
    const findData = findIn;
    let x;
    let y;
    findData.forEach(
        el => {
            const it = JSON.parse(JSON.stringify(curretItem));
            if(el.price_name.includes(curretItem.price_name)) {
                delete el.tableData;
                delete el.price_name;
                delete it.price_name;
                delete it.tableData;
                x = Object.values(el);
                y =  Object.values(it);
            }
        }
    );
    return {x: x, y: y};
}

export default function Financial() {
    const [state, setState] = React.useState({
        columns: financialData.columns,
        columns1: financialData.columns1,
        columns2: financialData.columns2,
        data: financialData.data,
        data1: financialData.data1,
        data2: financialData.data2,
        point: buildPoints(financialData),
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={7} spacing={3}>

                <MaterialTable
                    title="Producing and Pricing"
                    columns={state.columns}
                    options={{
                        search: false,
                        paging: false,
                        sorting: false
                    }}
                    data={state.data}
                    editable={{
                
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;


                                            const res = findData(JSON.parse(JSON.stringify(state.data1)), newData);
                                            totalRevenue(res.x, res.y, state, newData.price_name);
                                            sumRevenue(state);

                                            state.point = buildPoints(state);

                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),

                    }}

                />

                <MaterialTable
                    options={{
                        search: false,
                        paging: false,
                        toolbar: false,
                        sorting: false
                    }}
                    title=""
                    columns={state.columns1}
                    data={state.data1}
                    editable={{
                    
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState(prevState => {
                                            const data1 = [...prevState.data1];
                                            data1[data1.indexOf(oldData)] = newData;


                                            const res = findData(JSON.parse(JSON.stringify(state.data)), newData);
                                            totalRevenue(res.x, res.y, state, newData.price_name);
                                            sumRevenue(state);
                                            totalMboe(state);
                                            state.point = buildPoints(state);

                                            return { ...prevState, data1 };
                                        });
                                    }
                                }, 600);
                            }),
                       
                    }}
                />


                <MaterialTable
                    options={{
                        search: false,
                        paging: false,
                        sorting: false
                    }}
                    title="Income statement"
                    columns={state.columns2}
                    data={state.data2}
                />
            </Grid>

            <Grid item xs={5} spacing={3}>
                <TotalRevenues data = { state } />
                <Production/>
                <WaterOut/>
                <RigsCrews/>
            </Grid>



        </Grid>

    );
}
