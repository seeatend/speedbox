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
})

let FilterModule = (props) => {
  const { 
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    copVal,
    handleCopChange,
    statusKey,
    handleStatusChange,
    applyHandler,
    clearHandler,
    classes
  } = props;
  
  return (
    <Grid container>
      <Grid item xs={12} className={classes.filtersUp} >
        <Grid container alignItems="center">
          <Grid item xs={6} >
            <Grid container alignItems="center" spacing={24} >
              <Grid item><DatePicker onChange={handleFromDateChange} selected={fromDate} dateFormat="YYYY/MM/DD" /></Grid>
              <Grid item><DatePicker onChange={handleToDateChange} selected={toDate} dateFormat="YYYY/MM/DD" /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} >
            <Grid container alignItems="center" spacing={16} >
              <Grid item><Typography variant="body1">COP </Typography></Grid>
              <Grid item><Switch checked={copVal} onChange={handleCopChange} /></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.filtersDown}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container  alignItems="center" spacing={24}>
              <Grid item><Typography variant="body1">STATUS :</Typography></Grid>
              <Grid item >
                <StatusSelect statusKey={statusKey} handleStatusChange={handleStatusChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
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

