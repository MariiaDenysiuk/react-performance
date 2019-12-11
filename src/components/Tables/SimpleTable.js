import React, { Component } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default class SimpleTable extends Component {

    constructor(props) {
        super(props);
    }

    state = {
       header: this.props.header,
       body: this.props.body
    };

    render() {
        return (
         <Table aria-label="caption table" size="small">
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
        );
    }
}
