import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';

import { doLogin } from '../../../core/actions/app/login';
import { getOrders } from  '../../../core/actions/admin/orders';
import OrdersTable from '../../../components/AdminOrders/OrdersTable';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}
const OrderData = [
    createData('MUM1505203289', 'Mumbai, India', 'Dr. Vaidya', 3.7, 'New York, USA'),
    createData('PUN1505203111', 'Pune, India', 'Ram Mahajan', 25.0, 'Washington, USA'),
    createData('BAN1505203344', 'Bangalore, India', 'Dr. Vaidya', 16.0, 'Kolkata, India'),
    createData('CHE1505203777', 'Chennai, India', 'Dr. Vaidya', 6.0, 'Londaon, UK'),
    createData('MUM1505203909', 'Mumbai, India', 'Dr. Vaidya', 16.0, 'New York, USA'),
    createData('MUM1505203888', 'Mumbai, India', 'Dr. Vaidya', 3.2, 'New York, USA'),
    createData('MUM1505203544', 'Mumbai, India', 'Dr. Vaidya', 9.0, 'New York, USA'),
    createData('MYS1480385431', 'Kuala Lumpur, Malaysia', 'Dr. Vaidya', 2.0, 'Malaysia'),
    createData('MUM1505203255', 'Mumbai, India', 'Dr. Vaidya', 26.0, 'Germany'),
    createData('KOL1505203283', 'Kolkata, India', 'Dr. Vaidya', 0.2, 'Columbia City, Columbia'),
    createData('MUM1505203266', 'Mumbai, India', 'Dr. Vaidya', 0, 'New York, USA'),
    createData('AHE1505333345', 'Ahemdabad, India', 'Dr. Vaidya', 19.0, 'Mumbai, India'),
    createData('MUM1505203255', 'Mumbai, India', 'Dr. Vaidya', 18.0, 'New York, USA'),
  ];

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})

class Orders extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		  auth: true,
		  anchorEl: null,
		}
		// console.log('admin orders cons was called');
	}

	/**
	* LifeCycle Method: Component Did Mount
	*/
	componentWillMount() {
		this.props.getOrders();
		console.log('mount was called');
	}

	/**
	* LifeCycle Method: Component Will Receive Props
	*/
	componentWillreceiveProps(nextProps){

	}

	render(){
		const { classes } = this.props;
		const { user } = this.props;
		const { orderState } = this.props;
		const { orders } = orderState || [];
		console.log('admin orders was rendered ', orders);
		return(
		  	<div className={classes.root}>
		  		<Grid container>
			  		<Grid item xs={6}>
			  			<Typography variant="subheading">Add and Manage orders here.</Typography>
			    	</Grid>
			    	<Grid item xs={6} container justify={'flex-end'} >
				    	<Button className={classes.button} variant="raised" color="primary">
					        <AddIcon className={classes.leftIcon}/>
					    	Add New Order
					    </Button>
				    </Grid>
				    {
				    	orderState.loading? (<Grid item xs={6} sm={12} md={12} lg={12} >
			    			<p>loading....</p>
				   		</Grid>):
				    	<Grid item xs={6} sm={12} md={12} lg={12} >
			    			<OrdersTable Orders = {orders} header={'Orders'}/>
				   		</Grid>
				    }
			    </Grid>
		    </div>
		);
	}
}

function mapStateToProps(state) {
  return {
    user: state.user,
    orderState: state.aOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (data) => {
      dispatch(doLogin(data));
    },

    getOrders: (sysId) => {
      dispatch(getOrders(sysId));
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Orders));