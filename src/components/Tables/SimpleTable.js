import React, { Component } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class SimpleTable extends Component {

    constructor(props) {
        super(props);
    }

    state = {
       header: this.props.header,
       body: this.showData()
    };

    showData() {
        let rows = [];
        for (let i = 0; i < 200; i += 1) {
            const randomSelection = this.props.body[Math.floor(Math.random() * this.props.body.length)];
            rows.push(i, randomSelection);
        } 
        return rows;
    }

    render() {
        return (
         <Paper style={{ height: 400, width: '100%' }}>
            <Table aria-label="caption table" size="small" rowCount = {this.state.body.length} 
            rowGetter={({ index }) => this.state.body[index]} >
                <TableHead>
                    <TableRow>
                    {this.state.header.map(row => (
                    <TableCell >{row}</TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.body.map((row, i) => (
                    <TableRow key={row[this.state.header[0]]}>

                        {this.state.header.map((header, i) => (
                        <TableCell component="th" scope="row">
                            {row[header]}
                        </TableCell>
                        ))}

                    </TableRow>

                    ))}
                </TableBody>
            </Table>
        </Paper>
        );
    }
}
