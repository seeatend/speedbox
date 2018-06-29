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

import { AdminOrdersTableHeader as TableHeader } from '../../../constants/Table';
import SearchModule from '../../../components/Common/SearchModule';
import FilterModule from '../../../components/Common/FilterModule';
import DownloadBtn from '../../../components/Common/DownloadBtn';

import { doLogin } from '../../../core/actions/app/login';
import { getOrders, cleanBulkData } from '../../../core/actions/admin/orders';
import OrdersTable from '../../../components/AdminOrders/OrdersTable';
import DialogWrapper from '../../../components/AdminOrders/DialogWrapper';

let excelData = [{
	columns: TableHeader.map(i => {
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
    "textAlign": "center"
	}
});

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// auth: true,
			// anchorEl: null,
			pageNumber: 0,
			searchKey: "orderNo",
			searchVal: "",
			statusKey: "placed",
			fromDate: moment(),
			toDate: moment(),
			copVal: false,
			bulk: "",
			openDialog: false,
			selectedOrders: []
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
	setSelectedOrders = orderIds => {
		this.setState({ selectedOrders: orderIds });
	}
	
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
				<Grid container>
					<Grid item xs={12}><Typography variant="title">VIEW ORDERS</Typography></Grid>
					<Grid item xs={2}><Typography variant="body1"  className={classes.label}>SEARCH BY :</Typography></Grid>
					<Grid item xs={6}>
						<SearchModule 
							searchKey={this.state.searchKey} 
							handleSearchKeyChange={this.handleChange('searchKey')} 
							searchVal={this.state.searchVal} 
							handleSearchValChange={this.handleChange('searchVal')} 
							searchHandler={this.getOrdersBySearch}
						/>
					</Grid>
					<Grid item xs={4} className={classes.downloadContent} >
						<Grid container alignItems="center" spacing={24}>
							<Grid item>
								<Grid item><DatePicker onChange={this.handleDateChange('fromDate')} selected={this.state.fromDate} dateFormat="YYYY/MM/DD" className={classes.extra} /></Grid>
								<Grid item><DatePicker onChange={this.handleDateChange('toDate')} selected={this.state.toDate} dateFormat="YYYY/MM/DD" /></Grid>
							</Grid>
							<Grid item>
								<DownloadBtn excelData={excelData} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2}><Typography variant="body1" className={classes.label}>FILTERS :</Typography></Grid>
					<Grid item xs={6}>
						<FilterModule 
							fromDate={this.state.fromDate}
							toDate={this.state.toDate}
							handleFromDateChange={this.handleDateChange('fromDate')}
							handleToDateChange={this.handleDateChange('toDate')}
							copVal={this.state.copVal}
							handleCopChange={this.handleCopChange}
							statusKey={this.state.statusKey}
							handleStatusChange={this.handleChange('statusKey')}
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
								bulk={this.state.bulk} 
								bulkHandler={this.bulkActionHandler} 
								setSelectedOrders={this.setSelectedOrders} />
						</Grid>
					)}
				</Grid>
				
        <a id="dwnldLnk" ref="dwnldLnk" download="base64topdf.pdf" style={{display:'none'}} />
				<DialogWrapper openDialog={this.state.openDialog} closeDialog={this.closeDialog} bulk={this.state.bulk} selectedOrders={this.state.selectedOrders} />
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
