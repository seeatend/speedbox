import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import { Paper, Select, Checkbox, Typography, Toolbar, IconButton, Tooltip, MenuItem } from 'material-ui';
import {FilterList, Delete, ViewList, ArrowDownward, Check} from 'material-ui-icons';
import { lighten } from 'material-ui/styles/colorManipulator';
import { AdminOrdersTableHeader as TableHeader } from '../../constants/Table';
import BulkActionSelect from '../Common/BulkActionSelect';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const headStyles = theme => ({
  th: {
    textAlign: 'center',
    cursor: 'pointer'
  },
  checkbox: {
    fontSize: '20px',
    width: '20px'
  }
})

let createSortHandler = (property, onRequestSort) => event => {
  onRequestSort(event, property);
};

let EnhancedTableHead = props => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = props;
  
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
          {TableHeader.map(column => {
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

EnhancedTableHead = withStyles(headStyles)(EnhancedTableHead);

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.dark,
          backgroundColor: lighten(theme.palette.secondary.light, 0.4),
        }
      : {
          color: lighten(theme.palette.secondary.light, 0.4),
          backgroundColor: theme.palette.secondary.dark,
        },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, header, bulk, bulkHandler } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography variant="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography variant="title">{header}</Typography>
        )}
      </div>
      <BulkActionSelect 
        bulk={bulk}
        bulkHandler={bulkHandler}
      />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <Delete />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterList />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  td: {
    textAlign: 'center',
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
});

class OrdersTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    let { Orders } = props;
    console.log('From table one ', Orders);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: Orders.sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (!checked) {
      this.setState({ selected: this.state.data.map(n => n.orderNumber) }, () => {
        this.props.setSelectedOrders(this.state.selected);
      });
      return;
    }
    this.setState({ selected: [] }, () => {
      this.props.setSelectedOrders(this.state.selected);
    });
  };

  handleClick = (event, orderNum) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(orderNum);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, orderNum);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    
    this.setState({ selected: newSelected }, () => {
      this.props.setSelectedOrders(this.state.selected);
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = orderNum => this.state.selected.indexOf(orderNum) !== -1;

  render() {
    const { classes, header, bulk, bulkHandler } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} header={header} bulk={bulk} bulkHandler={bulkHandler} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, i) => {
                const isSelected = this.isSelected(n.orderNumber);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id || n._id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox" className={classes.noTd} onClick={event => this.handleClick(event, n.orderNumber)}>
                      <Checkbox checked={isSelected} className={classes.checkbox} /> {page*rowsPerPage+i+1}
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

OrdersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersTable);
