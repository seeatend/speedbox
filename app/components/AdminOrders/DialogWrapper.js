import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle,DialogContentText, Button, Slide } from 'material-ui';
import { Grid, TextField, Select, MenuItem } from 'material-ui';

import StatusSelect from '../Common/StatusSelect';
import { ordersBulkActions } from '../../core/actions/admin/orders';

const styles = theme => ({
  dialogAction: {
    margin: '0 20px 20px 20px !important',
    justifyContent: 'center'
  },
  select: {
    width: '60%',
    margin: '20px auto'
  },
  textField: {
    width: '90%',
    margin: '20px auto 0'
  }
});

const Transition = props => {
  return <Slide direction="down" {...props} />;
}

let ChangeStatusContent = (props) => {
  const { selectedStatus, selectedStatusMsg, handleChange, classes } = props
  return (
    <Grid container >
      <TextField id="search_val" value={selectedStatusMsg} onChange={handleChange('selectedStatusMsg')} placeholder="Enter some message..." margin="none" className={classes.textField} />
      <StatusSelect status={selectedStatus} handleStatusChange={handleChange('selectedStatus')} classname={classes.select} />
    </Grid>
  )
}
ChangeStatusContent = withStyles(styles)(ChangeStatusContent);

let SelectCSPContent = (props) => {
  const { selectedCSP, handleChange, classes } = props
  return (
    <Select value={selectedCSP} onChange={handleChange('selectedCSP')} className={classes.select} >
      <MenuItem value="csp1">csp1</MenuItem>
      <MenuItem value="csp2">csp2</MenuItem>
      <MenuItem value="csp3">csp3</MenuItem>
      <MenuItem value="csp4">csp4</MenuItem>
      <MenuItem value="csp5">csp5</MenuItem>
    </Select>
  )
}
SelectCSPContent = withStyles(styles)(SelectCSPContent);

const dialogData = {
  title: {
    changeStatus: "Select Status",
    downloadCSP: "Download CSP Label",
    downloadShipping: "Download Shipping Label",
    downloadInvoice: "Download Invoice",
    downloadArchive: "Download Archive",
    sendToCSP: "Select CSP",
    cancelUnprocessed: "Warning!"
  },
  contentText: {
    changeStatus: "You are going to change status, give some comment.",
    downloadCSP: "Click Proceed to download CSP labels.",
    downloadShipping: "You are going to download shipping labels for selected orders.",
    downloadInvoice: "You are going to download invoices for selected orders",
    downloadArchive: "You are going to download archive for selected orders.",
    sendToCSP: "You are going to send selected orders to be placed through selected CSP.",
    cancelUnprocessed: "Only unprocessed orders can be cancelled"
  }
}


class DialogWrapper extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      selectedStatus: "",
      selectedStatusMsg: "",
      selectedCSP: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  bulkActionHandler = () => {
    if(this.props.selectedOrders.length > 0) {
      let params = {}
      params.orderIds = this.props.selectedOrders;
      if(this.props.bulk == "changeStatus") {
        params.status = this.state.selectedStatus;
        params.message = this.state.selectedStatusMsg;
      }
      if(this.props.bulk == "sendToCSP") {
        params.csp = this.state.selectedCSP;
      }
      this.props.ordersBulkActionHandler(this.props.bulk, params)
      this.closeDialog();
    } else {
      this.closeDialog();
      alert("Please select the orders firstly.");
      return false;
    }
  }
  
  closeDialog = () => {
    this.props.closeDialog()
    this.setState({ selectedStatus: "", selectedStatusMsg: "", selectedCSP: "" });
  }

  render() {
    const { openDialog, bulk, classes } = this.props;
    const { selectedStatus, selectedStatusMsg, selectedCSP } = this.state;
    return (
      <div>
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="order-bulk-dialog-title" >
            { dialogData.title[bulk] || "Title" }
          </DialogTitle>
          <DialogContent id="order-bulk-dialog-content" >
            <DialogContentText id="order-bulk-dialog-contentText" >
              { dialogData.contentText[bulk] }
            </DialogContentText>
            { 
              bulk == "changeStatus" ? <ChangeStatusContent selectedStatus={selectedStatus} selectedStatusMsg={selectedStatusMsg} handleChange={this.handleChange} /> : null
            }
            {
              bulk == "sendToCSP" ? <SelectCSPContent selectedCSP={selectedCSP} handleChange={this.handleChange} /> : null
            }
          </DialogContent>
          <DialogActions className={classes.dialogAction} >
            <Button variant="raised" onClick={this.bulkActionHandler} color="secondary">
              Yes! Go Ahead
            </Button>
            <Button variant="raised" onClick={this.closeDialog}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
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

		ordersBulkActionHandler: (bulk, data) => {
			dispatch(ordersBulkActions(bulk, data));
		},
	};
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(DialogWrapper)
);