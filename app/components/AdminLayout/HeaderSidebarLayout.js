import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import { mailFolderListItems, otherMailFolderListItems } from './ListItems';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  sidebarClose: {
    width: '100%'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navIconShow: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  drawerHide: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      isSmUp: true
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  flex: {
    flex: 1,
  },
  drawerImg: {
    width: '100%'
  },
  captionHeading: {
    textAlign: 'center',
    fontSize: '1.2em',
    fontWeight: 'bold'
  },
  extraPadding: {
    padding: '16% 10% 2% 18%'
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class HeaderSidebarLayout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      mobileOpen: false,
      open: true,
    }
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawerClose = () => {
    this.setState({ open: !this.state.open });
  };


  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const drawer = (
      <div>
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );
    console.log(this.state);
    return (
        <div>
          <AppBar className={classNames(classes.appBar, !this.state.open && classes.sidebarClose)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open Menu"
                onClick={this.handleDrawerToggle}
                className={classNames( this.state.open && classes.isSmUp && classes.navIconShow )}
              >
                <MenuIcon />  
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Speedbox Dashboard
              </Typography>
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>Account Settings</MenuItem>
                  <MenuItem onClick={this.handleClose}>Switch Role</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={!this.state.open}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classNames(this.state.open && classes.drawerHide),
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant={this.state.mobileOpen? "temporary": "permanent"}
              open = {this.state.open}
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
            >
              { this.state.open? (<div>
                <div className={classes.extraPadding}>
                  <img className={classes.drawerImg} src="./images/site-icon.png"></img>
                </div>
                <Typography className={classes.captionHeading}>Speedbox Dashboard</Typography>
              </div>): (<div></div>)}
              {drawer}
            </Drawer>
          </Hidden>
        </div>
    );
  }
}

HeaderSidebarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HeaderSidebarLayout);