import React from "react";
import { withStyles } from 'material-ui/styles';
import { Select  } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import ordersConstant from "../../constants/Orders";

const styles = theme => ({
  select: {
    width: "170px"
  }
})

let StatusSelect = (props) => {
  const { 
    status,
    handleStatusChange,
    classname,
    classes
  } = props;
  
  return (
    <Select value={status} onChange={handleStatusChange} className={classname!=null?classname:classes.select} >
      {
        ordersConstant.status.map((s, i) => {
          return <MenuItem value={s.value} key={i}>{s.label}</MenuItem>
        })
      }
    </Select>
  )
}

StatusSelect = withStyles(styles)(StatusSelect);

module.exports = StatusSelect;

