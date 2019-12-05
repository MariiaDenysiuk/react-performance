import React from 'react';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Production from "./Charts/Production";
import WaterOut from "./Charts/WaterOut";
import RigsCrews from "./Charts/RigsCrews";
import TotalRevenues from "./Charts/TotalRevenue";

function totalRevenue(x, y, state) {
   const mult = x.map((el, i) => el * y[i]);
    state.data2[0].date1 = mult[1];
    state.data2[0].date2 = mult[2];
    state.data2[0].date3 = mult[3];
}

function findData(findIn, item) {
    const curretItem = item;
    const findData = findIn;
    let x;
    let y;
    findData.forEach(
        el => {
            if(el.price_name === curretItem.price_name) {
                delete el.tableData;
                delete el.price_name;
                x = Object.values(el);
                y =  Object.values(curretItem);
            }
        }
    );
    return {x: x, y: y};
}

export default function Financial() {
    const [state, setState] = React.useState({
        columns: [
            { title: '', field: 'price_name' },
            { title: '4/30/19', field: 'date1' },
            { title: '5/31/19', field: 'date2' },
            { title: '6/30/19', field: 'date3' },

        ],
        data: [
            { price_name: 'Price Deck', date1: '', date2: '', date3: '' },
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
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={7} spacing={3}>
                <MaterialTable
                    title="Producing and Pricing"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                             // console.log(state.data1);
                                             // console.log(newData);
                                            const res = findData(JSON.parse(JSON.stringify(state.data1)), newData);
                                            totalRevenue(res.x, res.y, state);
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />


                <MaterialTable
                    title=""
                    columns={state.columns1}
                    data={state.data1}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
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
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />


                <MaterialTable
                    title="Income statement"
                    columns={state.columns2}
                    data={state.data2}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
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
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
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
