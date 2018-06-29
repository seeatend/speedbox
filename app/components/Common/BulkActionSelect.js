import React from "react";
import { withStyles } from 'material-ui/styles';
import { Select, Typography  } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  bulk: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 0 auto'
  },
  select: {
    width: '230px'
  }
})

let BulkActionSelect = (props) => {
  const { 
    bulk,
    bulkHandler,
    classes
  } = props;
  
  return (
    <div className={classes.bulk}>
      <Typography variant="subheading" style={{marginRight:'15px',fontSize:'17px'}} >Bulk Actions : </Typography>
      <Select value={bulk} onChange={bulkHandler} className={classes.select} >
        <MenuItem value="changeStatus">Change Status</MenuItem>
        <MenuItem value="downloadCSP">Download CSP Label</MenuItem>
        <MenuItem value="downloadShipping">Download Shipping Label</MenuItem>
        <MenuItem value="downloadInvoice">Download Invoice</MenuItem>
        <MenuItem value="downloadArchive">Download Archive</MenuItem>
        <MenuItem value="sendToCSP">Send To CSP</MenuItem>
        <MenuItem value="cancelUnprocessed">Cancel Unprocessed Orders</MenuItem>
      </Select>
    </div>
  )
}

BulkActionSelect = withStyles(styles)(BulkActionSelect);

module.exports = BulkActionSelect;

