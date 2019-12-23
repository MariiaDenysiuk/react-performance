import React from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { AutoSizer, Column, Table } from 'react-virtualized';
import './SimpleTable.css';
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
        width: 150
    },
    noClick: {
        cursor: 'initial',
    },
});

class SimpleTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    constructor(props) {
        super(props);
    }

    getRowClassName = ({index}) => {
        const {classes, onRowClick} = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({cellData, columnIndex}) => {
        const {columns, classes, rowHeight, onRowClick} = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{height: rowHeight}}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({label, columnIndex}) => {
        const {headerHeight, columns, classes} = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{height: headerHeight}}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const {classes, columns, rowHeight, headerHeight, ...tableProps} = this.props;
        return (
            <AutoSizer>
                {({height, width}) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({dataKey, ...other}, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={headerProps =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

SimpleTable.propTypes = {
        classes: PropTypes.object.isRequired,
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                dataKey: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                numeric: PropTypes.bool,
                width: PropTypes.number.isRequired,
            }),
        ).isRequired,
        headerHeight: PropTypes.number,
        onRowClick: PropTypes.func,
        rowHeight: PropTypes.number,
};
const VirtualizedTable = withStyles(styles)(SimpleTable);
export default function ReactVirtualizedTable(props) {
    const state = {
        header: props.header,
        body: props.body
    };

    return (
        <Paper style={{ height: 400, width: '100%', overflow: 'auto hidden' }}>
            <VirtualizedTable
                rowCount={state.body.length}
                rowGetter={({ index }) => state.body[index]}
                columns={state.header}
            />
        </Paper>
    );
}

