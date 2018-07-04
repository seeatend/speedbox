import React from "react";
import { withStyles } from 'material-ui/styles';
import { Grid, Select, Typography, Switch, Button } from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Reorder, Clear } from 'material-ui-icons';
import ordersConstant from "../../constants/Orders";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import StatusSelect from './StatusSelect';


const styles = theme => ({
	filtersUp: {
		border: "1px solid #ccc",
    borderBottom: "none",
    padding: "10px 20px"
	},
	filtersDown: {
		border: "1px solid #ccc",
    borderTop: "none",
    padding: "0 20px 25px"
	},
	button: {
		fontSize: "15px",
		fontWeight: "normal",
		padding: "3px 8px"
  },
  datepicker: {
    padding: "12px 0 !important"
  }
})

let FilterModule = (props) => {
  const { 
    from_date,
    to_date,
    handleFromDateChange,
    handleToDateChange,
    cop,
    handleCopChange,
    status,
    handleStatusChange,
    applyHandler,
    clearHandler,
    classes
  } = props;
  
  return (
    <Grid container>
      <Grid item xs={12} className={classes.filtersUp} >
        <Grid container alignItems="center">
          <Grid item xs={8} >
            <Grid container alignItems="center" spacing={24} >
              <Grid item><Typography variant="body1">FROM : </Typography></Grid>
              <Grid item className={classes.datepicker}><DatePicker onChange={handleFromDateChange} selected={from_date} dateFormat="YYYY/MM/DD" /></Grid>
              <Grid item><Typography variant="body1">TO : </Typography></Grid>
              <Grid item className={classes.datepicker}><DatePicker onChange={handleToDateChange} selected={to_date} dateFormat="YYYY/MM/DD" /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} >
            <Grid container alignItems="center" spacing={16} >
              <Grid item><Typography variant="body1">COP </Typography></Grid>
              <Grid item><Switch checked={cop} onChange={handleCopChange} /></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.filtersDown}>
        <Grid container>
          <Grid item xs={8}>
            <Grid container  alignItems="center" spacing={24}>
              <Grid item><Typography variant="body1">STATUS :</Typography></Grid>
              <Grid item >
                <StatusSelect status={status} handleStatusChange={handleStatusChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container  alignItems="center" spacing={24}>
              <Grid item><Button variant="raised" size="small" className={classes.button} onClick={applyHandler} ><Reorder />APPLY</Button></Grid>
              <Grid item><Button variant="raised" size="small" className={classes.button} onClick={clearHandler} ><Clear />CLEAR</Button></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

FilterModule = withStyles(styles)(FilterModule);

module.exports = FilterModule;

