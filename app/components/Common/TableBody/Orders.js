import React from "react";
import { withStyles } from 'material-ui/styles';
import { Checkbox, IconButton  } from 'material-ui';
import Table, {
  TableBody,
  TableRow,
  TableCell
} from 'material-ui/Table';
import { ViewList, ArrowDownward, Check} from 'material-ui-icons';

const styles = theme => ({
  td: {
    textAlign: 'center',
    padding: '0px',
    paddingRight: '0px !important'
  },
  noTd: {
    textAlign: 'center',
    cursor: 'pointer'
  },
  iconButton: {
    width: '30px',
    height: '30px'
  },
  checkbox: {
    fontSize: '20px',
    width: '20px'
  }
})

let OrdersTableBody = (props) => {
  const { 
    data,
    page,
    rowsPerPage,
    isSelected,
    handleClick,
    emptyRows,
    classes
  } = props;
  
  return (
    <TableBody>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, i) => {
        const isselected = isSelected(n.orderNumber);
        return (
          <TableRow
            hover
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            key={i}
            selected={isselected}
          >
            <TableCell padding="checkbox" className={classes.noTd} onClick={event => handleClick(event, n.orderNumber)}>
              <Checkbox checked={isselected} className={classes.checkbox} /> {page*rowsPerPage+i+1}
            </TableCell>
            <TableCell padding="checkbox" className={classes.td}>{n.orderNumber}</TableCell>
            <TableCell padding="checkbox" className={classes.td}>{n._source.name}</TableCell>
            <TableCell padding="checkbox" className={classes.td}>{n._destination.name}</TableCell>
            <TableCell padding="checkbox" className={classes.td}>{`${n._destination.city}, ${n._destination.country}`}</TableCell>
            <TableCell padding="checkbox" className={classes.td}>{`${n._source.city}, ${n._source.country}`}</TableCell>
            <TableCell padding="checkbox" className={classes.td}>{n.weight || '-'}</TableCell>
            <TableCell padding="checkbox" className={classes.td}>{n._package.codAmount}</TableCell>
            <TableCell padding="checkbox" className={classes.td}>{n.status}</TableCell>
            <TableCell padding="checkbox" className={classes.td}>
              <IconButton className={classes.iconButton} ><ViewList /></IconButton>
              <IconButton className={classes.iconButton} ><ArrowDownward /></IconButton>
              <IconButton className={classes.iconButton} ><Check /></IconButton>
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={10} />
        </TableRow>
      )}
    </TableBody>
  )
}

OrdersTableBody = withStyles(styles)(OrdersTableBody);

module.exports = OrdersTableBody;

