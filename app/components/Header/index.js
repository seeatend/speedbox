import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
})

class Header extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillreceiveProps(nextProps){

	}

	render(){
		const { classes } = this.props;

		return(
			<AppBar position="static">
				<Toolbar>
				  <Typography variant="title" color="inherit" className={classes.flex}>
				    Speedbox Dashboard
				  </Typography>
				  <Button color="inherit">Need Help ?</Button>
				</Toolbar>
			</AppBar>		
		);
	}
}

export default withStyles(styles)(Header);