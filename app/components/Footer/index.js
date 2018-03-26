import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    bottom: 0
  },
  flex: {
    flex: 1,
  },
  fixed: {
  	position: 'fixed',
  	bottom: 0
  },
})

class Footer extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillreceiveProps(nextProps){

	}

	render(){
		const { classes } = this.props;

		return(
		  	<AppBar position="bottom" className={this.props.isFixed? classes.fixed: ''}>
		        <Toolbar>
		          <Typography variant="subheading" color="inherit" className={classes.flex}>
		            Speedbox<sup>TM</sup>
		          </Typography>
		        </Toolbar>
	    	</AppBar>
		);
	}
}

export default withStyles(styles)(Footer);