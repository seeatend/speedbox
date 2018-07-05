import React from 'react';

import { Link, Route } from 'react-router-dom';
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

import { doLogin } from '../../core/actions/app/login';
import HeaderSidebarLayout from '../../components/AdminLayout/HeaderSidebarLayout';
import Footer from '../../components/Footer';

// import SellerOrders from '../SellerOrders';
// import Header from '../Header';

import { AdminRoutes as Routes} from '../../routes.js'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    flex: 1
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		overflowY: 'scroll'
  },
})

class AdminLayout extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		  auth: true,
		  anchorEl: null,
		}
		// console.log('called header const');
		// 
		// console.log('Layout cons was called ');
	}

	componentWillMount(){

	}

	componentWillreceiveProps(nextProps){

	}

	render(){

		// console.log('Layput rerendered---- ', Routes)
		const { classes } = this.props;
		// console.log('CHILDRE--- ',this.props);
		return(
		  	<div className={classes.root}>
		  		<HeaderSidebarLayout/>
		        <main className={classes.content}>
		          <div className={classes.toolbar} />  
		          {Routes}
		         </main>
		    </div>
		);
	}
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) =>{
	return {
	    doLogin: (data) => {
	      dispatch(doLogin(data));
	    },
	};
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdminLayout));
