import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

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

const tableStyle = {
    height: "350px",
    overflow: "auto"
};


export default function TableUI(prop) {
    const classes = useStyles();
    const [state] = React.useState({
        columns: prop.tableData.header,
        data: prop.tableData.body,
    });

    return (
        <MaterialTable
            style={tableStyle}
            columns={state.columns}
            data={state.data}
        />
    );
}
