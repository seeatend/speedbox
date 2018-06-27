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
import _ from 'lodash';

import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

import { AdminOrdersTableHeader as TableHeader } from '../../../constants/Table';

import { doLogin } from '../../../core/actions/app/login';
import { getOrders } from '../../../core/actions/admin/orders';
import OrdersTable from '../../../components/AdminOrders/OrdersTable';
import DialogWrapper from '../../../components/AdminOrders/DialogWrapper';

let excelData = [{
	columns: TableHeader.map(i => {
		return i.label;
	}),
	data: []
}];

const styles = theme => ({
	select: {
		width: "145px"
	},
	textField: {
		width: "150px"
	},
	button: {
		fontSize: "15px",
		fontWeight: "normal",
		padding: "3px 8px"
	},
	extra: {
		marginBottom: "5px"
	},
	downloadContent: {
		paddingLeft: "20px"
	},
	downloadBtn: {
		fontSize: "16px",
		width: "125px",
    padding: "8px 15px"
	},
	label: {
		paddingLeft: "45%"
	},
	filtersUp: {
		border: "1px solid #ccc",
    borderBottom: "none",
    padding: "10px 20px"
	},
	filtersDown: {
		border: "1px solid #ccc",
    borderTop: "none",
    padding: "0 20px 25px"
	},
	searchIcon: {
		fontSize: "25px !important",
		cursor: "pointer"
	},
	loader: {
    "textAlign": "center"
	}
});

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// auth: true,
			// anchorEl: null,
			searchKey: "orderNo",
			searchVal: "",
			statusKey: "placed",
			fromDate: moment(),
			toDate: moment(),
			copVal: false,
			bulk: "",
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
	}
	
	componentWillMount() {
		this.props.getOrders();
	}
	componentWillReceiveProps(nextProps) {
			console.log("~~~~ Orders updated!")
			this.excelDataFormat(nextProps.orderState.orders)
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
		this.props.getOrders({
			searchKey: this.state.searchKey,
			searchVal: this.state.searchVal
		});
	}
	getOrdersByFilters() {
		this.props.getOrders({
			fromDate: this.state.fromDate,
			toDate: this.state.toDate,
			status: this.state.statusKey,
			cop: this.state.cop
		});
	}
	clearFilters() {
		this.setState({
			fromDate: moment(),
			toDate: moment(),
			statusKey: "placed",
			copVal: false
		})
	}
	handleChange = name => event => {
    this.setState({ [name]: event.target.value });
	};
	bulkActionHandler = event => {
    this.setState({ bulk: event.target.value, openDialog: true });
  };
	handleDateChange = name => date => {
    this.setState({ [name]: date });
	}
	handleCopChange = event => {
    this.setState({ copVal: event.target.checked });
	};
	
	closeDialog = () => {
    this.setState({ openDialog: false });
  };

	render() {
		const { classes } = this.props;
		const { user } = this.props;
		const { orderState } = this.props;
		const { orders } = orderState || [];
		
		return (
			<div className="orders-container">
				<Grid container alignItems="center">
					<Grid item xs={12}><Typography variant="title">VIEW ORDERS</Typography></Grid>
					<Grid item xs={2}><Typography variant="body1"  className={classes.label}>SEARCH BY :</Typography></Grid>
					<Grid item xs={6}>
						<Grid container alignItems="center">
							<Grid item >
								<Select value={this.state.searchKey} onChange={this.handleChange('searchKey')} className={classes.select} >
									<MenuItem value="orderNo">Order Number</MenuItem>
									<MenuItem value="email">Email</MenuItem>
									<MenuItem value="shipName">Shipper Name</MenuItem>
									<MenuItem value="consinee">Consinee Name</MenuItem>
									<MenuItem value="address">Address</MenuItem>
									<MenuItem value="customerRef">Customer Reference</MenuItem>
									<MenuItem value="awb">AWB</MenuItem>
									<MenuItem value="returnAwb">Return AWB</MenuItem>
									<MenuItem value="companyName">Company Name</MenuItem>
								</Select>
							</Grid>
							<Grid item >
								<TextField id="search_val" value={this.state.searchVal} onChange={this.handleChange('searchVal')} margin="none" className={classes.textField} />
							</Grid>
							<Grid item ><Search className={classes.searchIcon} onClick={this.getOrdersBySearch} /></Grid>
						</Grid>
					</Grid>
					<Grid item xs={4} className={classes.downloadContent} >
						<Grid container alignItems="center" spacing={24}>
							<Grid item>
								<Grid item><DatePicker onChange={this.handleDateChange('fromDate')} selected={this.state.fromDate} dateFormat="YYYY/MM/DD" className={classes.extra} /></Grid>
								<Grid item><DatePicker onChange={this.handleDateChange('toDate')} selected={this.state.toDate} dateFormat="YYYY/MM/DD" /></Grid>
							</Grid>
							<Grid item>
								{/* <Button variant="raised" size="small" className={classes.downloadBtn}>DOWNLOAD ARCHIVE</Button> */}
								<div>
										<ExcelFile element={<Button variant="raised" size="small" className={classes.downloadBtn}>DOWNLOAD ARCHIVE</Button>}>
												<ExcelSheet dataSet={excelData} name="Organization"/>
										</ExcelFile>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2}><Typography variant="body1" className={classes.label}>FILTERS :</Typography></Grid>
					<Grid item xs={6} className={classes.filtersUp} >
						<Grid container alignItems="center">
							<Grid item xs={6} >
								<Grid container alignItems="center" spacing={24} >
									<Grid item><DatePicker onChange={this.handleDateChange('fromDate')} selected={this.state.fromDate} dateFormat="YYYY/MM/DD" /></Grid>
									<Grid item><DatePicker onChange={this.handleDateChange('toDate')} selected={this.state.toDate} dateFormat="YYYY/MM/DD" /></Grid>
								</Grid>
							</Grid>
							<Grid item xs={6} >
								<Grid container alignItems="center" spacing={16} >
									<Grid item><Typography variant="body1">COP </Typography></Grid>
									<Grid item><Switch checked={this.state.copVal} onChange={this.handleCopChange} /></Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={4}></Grid>
					<Grid item xs={2}></Grid>
					<Grid item xs={6} className={classes.filtersDown}>
						<Grid container>
							<Grid item xs={6}>
								<Grid container  alignItems="center" spacing={24}>
									<Grid item><Typography variant="body1">STATUS :</Typography></Grid>
									<Grid item >
										<Select value={this.state.statusKey} onChange={this.handleChange('statusKey')} className={classes.select} >
											<MenuItem value="placed">Placed</MenuItem>
											<MenuItem value="assigned">Assigned</MenuItem>
											<MenuItem value="pickup">Pickup</MenuItem>
											<MenuItem value="in_transit">In Transition</MenuItem>
											<MenuItem value="rto">Rto</MenuItem>
											<MenuItem value="delivery_exception">Delivery Exception</MenuItem>
											<MenuItem value="cancelled">Cancelled</MenuItem>
											<MenuItem value="delivered">Delivered</MenuItem>
											<MenuItem value="ready_to_process">Ready To Process</MenuItem>
											<MenuItem value="processed">Processed</MenuItem>
											<MenuItem value="unprocessed">Unprocessed</MenuItem>
										</Select>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container  alignItems="center" spacing={24}>
									<Grid item><Button variant="raised" size="small" className={classes.button} onClick={this.getOrdersByFilters} ><Reorder />APPLY</Button></Grid>
									<Grid item><Button variant="raised" size="small" className={classes.button} onClick={this.clearFilters} ><Clear />CLEAR</Button></Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					{orderState.loading ? (
						<Grid item xs={6} sm={12} md={12} lg={12}>
							<p className={classes.loader}><img className={classes.drawerImg} src="./images/loader.gif"></img></p>
						</Grid>
					) : (
						<Grid item xs={6} sm={12} md={12} lg={12}>
							<OrdersTable Orders={orders} header={'Orders'} bulk={this.state.bulk} bulkHandler={this.bulkActionHandler} />
						</Grid>
					)}
				</Grid>

				<DialogWrapper openDialog={this.state.openDialog} closeDialog={this.closeDialog} bulk={this.state.bulk} />
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
	};
};

export default withStyles(styles)(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Orders),
);
