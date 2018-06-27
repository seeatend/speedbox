import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle,DialogContentText, Button, Slide } from 'material-ui';
import { Grid, TextField, Select, MenuItem } from 'material-ui';

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
      <Select value={selectedStatus} onChange={handleChange('selectedStatus')} className={classes.select} >
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
            <Button variant="raised" onClick={this.closeDialog} color="secondary">
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

export default withStyles(styles)(DialogWrapper);