import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Checkbox, Tooltip  } from 'material-ui';
import Table, {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel
} from 'material-ui/Table';

import AdminTableHeader from '../../../constants/Table';

const headStyles = theme => ({
  th: {
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0px',
    paddingRight: '0px !important'
  },
  checkbox: {
    fontSize: '20px',
    width: '20px'
  }
})

let createSortHandler = (property, onRequestSort) => event => {
  onRequestSort(event, property);
};

let TableHeader = props => {
  const { tableType, onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = props;
  
  return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" className={classes.th} onClick={event => onSelectAllClick(event, numSelected === rowCount)} >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              className={classes.checkbox}
            />S.NO
          </TableCell>
          {AdminTableHeader[tableType].map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'checkbox'}
                sortDirection={orderBy === column.id ? order : false}
                className={classes.th}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={createSortHandler(column.id, props.onRequestSort)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
};

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

TableHeader = withStyles(headStyles)(TableHeader);

module.exports = TableHeader;

