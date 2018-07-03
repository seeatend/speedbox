import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Button, Grid, Select, Switch, Typography, TextField, Modal } from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Reorder, Clear, Search } from 'material-ui-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import AdminTableHeader from '../../../constants/Table';
import SearchModule from '../../../components/Common/SearchModule';
import FilterModule from '../../../components/Common/FilterModule';
import DownloadBtn from '../../../components/Common/DownloadBtn';

import { doLogin } from '../../../core/actions/app/login';
import { getOrders, setOrdersOptions, cleanBulkData } from '../../../core/actions/admin/orders';
import OrdersTable from '../../../components/AdminOrders/OrdersTable';
import DialogWrapper from '../../../components/AdminOrders/DialogWrapper';

let excelData = [{
	columns: AdminTableHeader.orders.map(i => {
		return i.label;
	}),
	data: []
}];

const styles = theme => ({
	extra: {
		marginBottom: "5px"
	},
	downloadContent: {
		paddingLeft: "20px"
	},
	label: {
		paddingLeft: "45%",
		paddingTop: "5px"
	},
	loader: {
    textAlign: "center"
	},
	datelabel: {
		width: "55px"
	}
});

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// auth: true,
			// anchorEl: null,
			openDialog: false
		};
		
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleCopChange = this.handleCopChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getOrdersByFilters = this.getOrdersByFilters.bind(this);
		this.getOrdersBySearch = this.getOrdersBySearch.bind(this);
		this.clearFilters = this.clearFilters.bind(this);
		this.bulkActionHandler = this.bulkActionHandler.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
	}
	
	componentWillMount() {
		const search = this.props.location.search;
		const paramsIterator = new URLSearchParams(search);
		let params = {}
		for(let key of paramsIterator.keys()) {
			if(key == "fromDate" || key == "toDate") {
				params[key] = moment(parseInt(paramsIterator.get(key)))
			} else if(key == "page") {
				params[key] = parseInt(paramsIterator.get(key))
			} else {
				params[key] = paramsIterator.get(key);
			}
		}
		this.props.setOrdersOptions(params)
		this.props.getOrders();
	}
	componentWillReceiveProps(nextProps) {
			console.log("~~~~ Orders updated!")
			this.excelDataFormat(nextProps.orderState.orders)

			if(nextProps.orderState.bulk_data != "") {
				this.refs.dwnldLnk.href = 'data:application/octet-stream;base64,' + nextProps.orderState.bulk_data;
				this.refs.dwnldLnk.click();
				nextProps.cleanBulkData();
			}
	}
	excelDataFormat(newOrders) {
		excelData[0].data = newOrders.map(i => {
			return [
				{value: i.orderNumber},
				{value: i._source.name},
				{value: i._destination.name},
				{value: i._destination.city + i._destination.country},
				{value: i._source.city + i._source.country},
				{value: i.weight.toString() || '-'},
				{value: i._package.codAmount.toString()},
				{value: i.status}
			];
		});
	}
	getOrdersBySearch() {
		const { searchKey, searchVal, page, rowsPerPage } = this.props.orderState.orders_options;
		this.props.history.push(`/orders?searchKey=${searchKey}&searchVal=${searchVal}&page=${page}&rowsPerPage=${rowsPerPage}`);
		this.props.setOrdersOptions({page: 0});
		this.props.getOrders({ searchKey, searchVal, page: 0, rowsPerPage });
	}
	getOrdersByFilters() {
		const { fromDate, toDate, status, cop, page, rowsPerPage } = this.props.orderState.orders_options;
		this.props.history.push(`/orders?fromDate=${fromDate}&toDate=${toDate}&status=${status}&cop=${cop}&page=${page}&rows_count=${rowsPerPage}`);
		this.props.getOrders({ fromDate, toDate, status, cop, page, rowsPerPage });
	}
	clearFilters() {
		this.props.setOrdersOptions({ fromDate: moment(), toDate: moment(), status: "placed", cop: false, page: 0 })
		this.props.history.push(`/orders?fromDate=${fromDate}&toDate=${toDate}&status=${status}&cop=${cop}&page=${page}`);
		this.getOrdersByFilters();
	}
	handleChange = name => event => {
    this.props.setOrdersOptions({ [name]: event.target.value });
	};
	bulkActionHandler = event => {
    this.props.setOrdersOptions({ bulk: event.target.value, openDialog: true });
  };
	handleDateChange = name => date => {
    this.props.setOrdersOptions({ [name]: date });
	}
	handleCopChange = event => {
    this.props.setOrdersOptions({ cop: event.target.checked });
	};
	setSelectedOrders = orderIds => {
		this.props.setOrdersOptions({ selectedOrders: orderIds });
	}
	handleChangePage = page => {
		this.props.setOrdersOptions({ page })
		this.props.getOrders({
			...this.props.orderState.orders_options,
			page
		});
	}
	handleChangeRowsPerPage = count => {
		this.props.setOrdersOptions({ rowsPerPage: count })
		this.props.getOrders({
			...this.props.orderState.orders_options,
			rowsPerPage: page
		});
	}
	
	closeDialog = () => {
    this.setState({ openDialog: false });
  };

	render() {
		const { classes } = this.props;
		const { user } = this.props;
		const { orderState } = this.props;
		const { orders } = orderState || [];
		const { searchKey, searchVal, status, fromDate, toDate, cop, bulk, selectedOrders, page, rowsPerPage } = orderState.orders_options;
		
		return (
			<div className="orders-container">
				<Grid container>
					<Grid item xs={12}><Typography variant="title">VIEW ORDERS</Typography></Grid>
					<Grid item xs={2} lg={2}><Typography variant="body1" className={classes.label}>SEARCH BY :</Typography></Grid>
					<Grid item xs={5} lg={6}>
						<SearchModule 
							searchKey={searchKey} 
							handleSearchKeyChange={this.handleChange('searchKey')} 
							searchVal={searchVal} 
							handleSearchValChange={this.handleChange('searchVal')} 
							searchHandler={this.getOrdersBySearch}
						/>
					</Grid>
					<Grid item xs={5} lg={4} className={classes.downloadContent} >
						<Grid container alignItems="center" spacing={24}>
							<Grid item>
								<Grid container alignItems="center">
								<Grid item><Typography variant="body1" className={classes.datelabel}>FROM : </Typography></Grid>
								<Grid item><DatePicker onChange={this.handleDateChange('fromDate')} selected={fromDate} dateFormat="YYYY/MM/DD" className={classes.extra} /></Grid>
								</Grid>
								<Grid container alignItems="center">
								<Grid item><Typography variant="body1" className={classes.datelabel}>TO : </Typography></Grid>
								<Grid item><DatePicker onChange={this.handleDateChange('toDate')} selected={toDate} dateFormat="YYYY/MM/DD" /></Grid>
								</Grid>
							</Grid>
							<Grid item>
								<DownloadBtn excelData={excelData} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2}><Typography variant="body1" className={classes.label}>FILTERS :</Typography></Grid>
					<Grid item xs={9} md={9} lg={7} style={{marginTop:'10px'}}>
						<FilterModule 
							fromDate={fromDate}
							toDate={toDate}
							handleFromDateChange={this.handleDateChange('fromDate')}
							handleToDateChange={this.handleDateChange('toDate')}
							cop={cop}
							handleCopChange={this.handleCopChange}
							status={status}
							handleStatusChange={this.handleChange('status')}
							applyHandler={this.getOrdersByFilters}
							clearHandler={this.clearFilters}
						/>
					</Grid>
					{orderState.loading ? (
						<Grid item xs={6} sm={12} md={12} lg={12}>
							<p className={classes.loader}><img className={classes.drawerImg} src="./images/loader.gif"></img></p>
						</Grid>
					) : (
						<Grid item xs={6} sm={12} md={12} lg={12}>
							<OrdersTable 
								Orders={orders} 
								header={'Orders'} 
								bulk={bulk} 
								bulkHandler={this.bulkActionHandler} 
								setSelectedOrders={this.setSelectedOrders}
								page={page}
								rowsPerPage={rowsPerPage}
								handleChangePage={this.handleChangePage}
								handleChangeRowsPerPage={this.handleChangeRowsPerPage}
							/>
						</Grid>
					)}
				</Grid>
				
        <a id="dwnldLnk" ref="dwnldLnk" download="base64topdf.pdf" style={{display:'none'}} />
				<DialogWrapper openDialog={this.state.openDialog} closeDialog={this.closeDialog} bulk={bulk} selectedOrders={selectedOrders} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		orderState: state.aOrders,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		doLogin: data => {
			dispatch(doLogin(data));
		},
		getOrders: sysId => {
			dispatch(getOrders(sysId));
		},
		setOrdersOptions: options => {
			dispatch(setOrdersOptions(options));
		},
		cleanBulkData: () => {
			dispatch(cleanBulkData);
		}
	};
};

export default withStyles(styles)(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Orders),
);
