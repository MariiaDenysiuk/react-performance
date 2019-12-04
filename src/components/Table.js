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
    const [state] = React.useState({
        columns: prop.tableData.data.header,
        data: prop.tableData.data.body,
    });

    return (
        <MaterialTable
            title={prop.tableData.tableName}
            style={tableStyle}
            columns={state.columns}
            data={state.data}
        />
    );
}
