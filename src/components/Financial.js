import React from 'react';
import MaterialTable, { MTableCell } from 'material-table';
import Grid from '@material-ui/core/Grid';
import Production from "./Charts/Production";
import WaterOut from "./Charts/WaterOut";
import RigsCrews from "./Charts/RigsCrews";
import TotalRevenues from "./Charts/TotalRevenue";
import API from '../api/API';
import { TimeSeries } from 'pondjs';

const dd = {
    columns: [
        { title: 'Price Deck', field: 'price_name' },
        { title: '4/30/19', field: 'date1', type: 'currency' },
        { title: '5/31/19', field: 'date2', type: 'currency' },
        { title: '6/30/19', field: 'date3', type: 'currency' },

    ],
    data: [
        { price_name: 'Gas', date1: 2.05, date2: 2.05, date3: 2.05 },
        { price_name: 'Oil', date1: 92.56, date2: 90.47, date3: 88.10 },
        { price_name: 'Liquids', date1: '', date2: '', date3: '' },
    ],

    columns1: [
        { title: '', field: 'price_name' },
        { title: '4/30/19', field: 'date1' },
        { title: '5/31/19', field: 'date2' },
        { title: '6/30/19', field: 'date3' },

    ],
    data1: [
        { price_name: 'Production', date1: '', date2: '', date3: '' },
        { price_name: 'Gas', date1: 1.415, date2: 1.429, date3: 1.384 },
        { price_name: 'Oil', date1: 1.149, date2: 1.156, date3: 1.107 },
        { price_name: 'NGLs(Mbls)', date1: '', date2: '', date3: '' },
    ],

    columns2: [
        { title: '', field: 'price_name' },
        { title: '4/30/19', field: 'date1' },
        { title: '5/31/19', field: 'date2' },
        { title: '6/30/19', field: 'date3' },

    ],
    data2: [
        { price_name: 'Gas Revenue',date1: 4.704, date2: 4.530, date3: 4.259 },
        { price_name: 'Oil Revenue', date1: 105.781, date2: 104.054, date3: 97.070 },
        { price_name: 'NGLs Revenue', date1: 13.671, date2: 90.47, date3: 88.10 },
        { price_name: 'Other Revenue', date1: '', date2: '', date3: '' },
        { price_name: 'Effect of Hedges', date1: 22, date2: 21.802, date3: 19.324 },
        { price_name: 'Total Revenue', date1: 101490, date2: 99995, date3: 94477 },
    ],
}

function totalRevenue(x, y, state, currentName) {
   const mult = x.map((el, i) => el * +y[i]);
    state.data2.map((el, i) => {
       if(el.price_name.includes(currentName)) {
           console.log(mult)
           state.data2[i].date1 = mult[0].toFixed(2);
           state.data2[i].date2 = mult[1].toFixed(2);
           state.data2[i].date3 = mult[2].toFixed(2);
       }
    });
}

function sumRevenue(state) {
  let sum = {};
  const currenData = JSON.parse(JSON.stringify(state));
  const fieldName = '';
  currenData.columns.map((col, i) => {
      if(i !=0 ) {
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

function totalMboe(x, y, state, currentName) {
    const par1 = 6;
    const par2 = 1;
    const mult = x.map((el, i) => el * +y[i]);
    state.data2.map((el, i) => {
        if(el.price_name.includes(currentName)) {
            state.data2[i].date1 = mult[0].toFixed(2);
            state.data2[i].date2 = mult[1].toFixed(2);
            state.data2[i].date3 = mult[2].toFixed(2);
        }
    });
}

function buildPoints(props) {
    // const revenue = API.getRevenue(this.props);
    let revenue;
    const kon = JSON.parse(JSON.stringify(props));
    revenue = API.getRevenue(kon);

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
            const it = JSON.parse(JSON.stringify(curretItem))
            if(el.price_name === curretItem.price_name) {
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
        columns: [
            { title: 'Price Deck', field: 'price_name', editable: 'never', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
            { title: '4/30/19', field: 'date1', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
            { title: '5/31/19', field: 'date2', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
            { title: '6/30/19', field: 'date3', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },

        ],
        data: [
            { price_name: 'Gas', date1: 2.05, date2: 2.05, date3: 2.05 },
            { price_name: 'Oil', date1: 92.56, date2: 90.47, date3: 88.10 },
            { price_name: 'Liquids', date1: '', date2: '', date3: '' },
        ],

        point: buildPoints(dd),
        
        totalPoint: buildPoints(dd),

        columns1: [
            { title: 'Production', field: 'price_name', editable: 'never', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'}  },
            { title: '4/30/19', field: 'date1', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
            { title: '5/31/19', field: 'date2', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
            { title: '6/30/19', field: 'date3', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },

        ],
        data1: [
            { price_name: 'Gas', date1: 1.415, date2: 1.429, date3: 1.384 },
            { price_name: 'Oil', date1: 1.149, date2: 1.156, date3: 1.107 },
            { price_name: 'NGLs(Mbls)', date1: '', date2: '', date3: '' },
        ],

        columns2: [
            { title: '', field: 'price_name', editable: 'never', cellStyle: {textAlign: 'right'} , headerStyle: {textAlign: 'right'} },
            { title: '4/30/19', field: 'date1', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
            { title: '5/31/19', field: 'date2', type: 'currency', cellStyle: {textAlign: 'right'} , headerStyle: {textAlign: 'right'}},
            { title: '6/30/19', field: 'date3', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },

        ],
        data2: [
            { price_name: 'Gas Revenue',date1: 4.704, date2: 4.530, date3: 4.259 },
            { price_name: 'Oil Revenue', date1: 105.781, date2: 104.054, date3: 97.070 },
            { price_name: 'NGLs Revenue', date1: 13.671, date2: 90.47, date3: 88.10 },
            { price_name: 'Other Revenue', date1: '', date2: '', date3: '' },
            { price_name: 'Effect of Hedges', date1: 22, date2: 21.802, date3: 19.324 },
            { price_name: 'Total Revenue', date1: 101490, date2: 99995, date3: 94477 },
        ],
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
                        toolbar: false,
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
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;

                                            const res = findData(JSON.parse(JSON.stringify(state.data1)), newData);
                                            totalRevenue(res.x, res.y, state, newData.price_name);

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
                    title="Income statement"
                    columns={state.columns2}
                    data={state.data2}
                    editable={{
                       
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                       
                    }}
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
