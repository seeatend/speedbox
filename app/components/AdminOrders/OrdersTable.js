import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import { Paper, Typography, Toolbar, IconButton, Tooltip } from 'material-ui';
import { FilterList, Delete } from 'material-ui-icons';
import { lighten } from 'material-ui/styles/colorManipulator';
import BulkActionSelect from '../Common/BulkActionSelect';
import OrdersTableBody from '../Common/TableBody/Orders';
import OrdersTableHeader from '../Common/TableHeader/Header';

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
      data: Orders.sort((a, b) => (a.calories < b.calories ? -1 : 1))
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
    this.props.handleChangePage(page);
  };

  handleChangeRowsPerPage = event => {
    this.props.handleChangeRowsPerPage(event.target.value);
  };

  isSelected = orderNum => this.state.selected.indexOf(orderNum) !== -1;

  render() {
    const { classes, header, bulk, bulkHandler, page, rowsPerPage } = this.props;
    const { data, order, orderBy, selected } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} header={header} bulk={bulk} bulkHandler={bulkHandler} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <OrdersTableHeader
              tableType="orders"
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <OrdersTableBody 
              data={data}
              page={page}
              rowsPerPage={rowsPerPage}
              isSelected={this.isSelected}
              handleClick={this.handleClick}
              emptyRows={emptyRows}
            />
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
