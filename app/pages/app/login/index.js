import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI styles---
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
// import Send from 'material-ui-icons/Send';

// File Imports---
import { doLogin } from '../../../core/actions/app/login';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: '6% 0%'
  },
  item: {
    margin: '5% 0%',
    width: 'auto',
    minWidth: '400px'
  },
  itemSignup:{
    margin: '1% 0%',
    width: 'auto',
    minWidth: '400px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  flex: {
    flex: 1,
  },
  sectionHeading: {
    fontSize: '2em',
    color: 'black',
    paddingTop: '10px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '80%',
  },
  inputs: {
    padding: '3% 0%',
    margin: '1%'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  switchText: {
    marginTop: '8px'
  }
});
class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      	name: '',
      	email: '',
        password: '',
        showPassword: false,
        isLoginState: true,
      };

      this.handleSwitchAccount = this.handleSwitchAccount.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
    	console.log('called DID MOUNT---------------------')
      // this.props.history.push('/home');
    }
    componentWillReceiveProps(nextProps){
    	
    }

    handleChange = prop => event => {
    	console.log(prop);
      this.setState({
        [prop]: event.target.value
      });
    };

    handleMouseDownPassword = event => {
      event.preventDefault();
    };

    handleClickShowPasssword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    };

   	handleSwitchAccount = prop => event => {
   		// console.log(prop);
      this.setState({
      	isLoginState: prop 
      });
    };

    handleSubmit = prop => event =>{
    	// console.log('in submit')
    	// console.log('Current state', this.state);
    	const currentState = {
    		Email: this.state.email,
    		Password: this.state.password
    	};
    	this.props.doLogin(currentState);
    }

	render(){
	  const { classes } = this.props;

	  // console.log('New Props---', this.props);
	  let nextProps = this.props;
		if(nextProps.user.isLoggedIn && nextProps.user.isTokenActive){
	    		this.props.history.push('/orders');
          return (<div></div>);
  	}
	  return (
		  <div className={classes.root}>
	      <Header/>
			  <Grid container className={classes.container}>
	      	<Grid item sm={3}></Grid>
	        <Grid item xs={12} sm={6}  lg={6} className={ this.state.isLoginState? classes.item : classes.itemSignup }>
	          <Paper className={classes.paper}>
	          	<Typography variant="title" color="inherit" className={classes.sectionHeading}>
	          		{ this.state.isLoginState? 'Welcome Back!': 'Create New Account' }
	          	</Typography>
  		        <div className={classes.inputs}>
  		        	{
  		        		this.state.isLoginState? (<div></div>):
  		        		(<FormControl fullWidth className={classes.formControl}>
  				          <InputLabel htmlFor="Full Name">Name</InputLabel>
  				          <Input
  				            id="name"
  					        type="text"
  					        placeholder="Enter your name..."
  					        onChange = {this.handleChange('name')}
  				          	/>
  				        </FormControl>)
  				      }
  			        <FormControl fullWidth className={classes.formControl}>
  			          <InputLabel htmlFor="email">Email</InputLabel>
  			          <Input
  			            id="email"
  				        type="email"
  				        placeholder="Enter your email..."
  				        onChange = {this.handleChange('email')}
  				        margin="dense"
  			          	/>
  			        </FormControl>
  			        <FormControl fullWidth className={classes.formControl}>
  			          <InputLabel htmlFor="password">Password</InputLabel>
  			          <Input
  			            id="password"
  			            type={this.state.showPassword ? 'text' : 'password'}
  			            value={this.state.password}
  			          	placeholder="Enter your password..."
  			            onChange={this.handleChange('password')}
  			            endAdornment={
  			              <InputAdornment position="end">
  			                <IconButton
  			                  onClick={this.handleClickShowPasssword}
  			                  onMouseDown={this.handleMouseDownPassword}
  			                >
  			                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
  			                </IconButton>
  			              </InputAdornment>
  			            }
  			          />
  			        </FormControl>
  		        </div>
  		        <Button onClick={this.handleSubmit()} className={classes.button} variant="raised" color="primary">
  			        {this.state.isLoginState? 'Login': 'Sign Up'}
  			        <Icon className={classes.rightIcon}>send</Icon>
  			     </Button>
  		        <Typography gutterBottom align="center" className={classes.switchText}>
  		        {
  		        	this.state.isLoginState? (
  		        		<span>New at Speedbox? <a href="#" onClick={this.handleSwitchAccount(false)}>Create New Account</a></span>
  		        		): (<span>Already a user? <a href="#" onClick={this.handleSwitchAccount(true)}> Login</a></span>)
  		        }
  		        </Typography>		        
	          </Paper>
	        </Grid>
		    </Grid>
        <Footer isFixed = { this.state.isLoginState || false } />
		  </div>
  	);
	}
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  console.log('this is state' + state);
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));