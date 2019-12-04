import React, { Component } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Grid from '@material-ui/core/Grid';
import Production from './Charts/Production';
import WaterOut from './Charts/WaterOut';
import RigsCrews from "./Charts/RigsCrews";
import TableUI from "./Table";
import API from "../api/API";
import MaterialTable from "material-table";

const tableProduction = API.getProduction().table;

export default class Financial extends Component {

    render() {
        return (
            <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <MaterialTable
                            title="Production and pricing"
                            columns={[
                                { title: '4/30/19', field: 'date1', defaultGroupOrder: 0 },
                                { title: '5/31/19', field: 'date2' },
                                { title: '6/30/19', field: 'date3', type: 'numeric' },

                            ]}
                            data={[
                                { name: 'Price Deck', date1: '', date2: '', date3: ''},
                                { name: 'Production',  },
                            ]}
                            options={{
                                grouping: true
                            }}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            // setState(prevState => {
                                            //     const data = [...prevState.data];
                                            //     data.push(newData);
                                            //     return { ...prevState, data };
                                            // });
                                        }, 600);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            if (oldData) {
                                                // API.updateWells(newData);
                                                // setState(prevState => {
                                                //     const data = [...prevState.data];
                                                //     data[data.indexOf(oldData)] = newData;
                                                //     return { ...prevState, data };
                                                // });
                                            }
                                        }, 600);
                                    }),
                                onRowDelete: oldData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            // setState(prevState => {
                                            //     const data = [...prevState.data];
                                            //     data.splice(data.indexOf(oldData), 1);
                                            //     return { ...prevState, data };
                                            // });
                                        }, 600);
                                    }),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                            <Production/>
                            <WaterOut/>
                            <RigsCrews/>
                    </Grid>
            </Grid>
        );
    }
}
