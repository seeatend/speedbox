import React from "react";
import { withStyles } from 'material-ui/styles';
import { Grid, Select, TextField,  } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { Search } from 'material-ui-icons';
import ordersConstant from "../../constants/Orders";

const styles = theme => ({
  select: {
    width: "145px"
  },
	textField: {
		width: "150px"
	},
	searchIcon: {
		fontSize: "25px !important",
		cursor: "pointer"
	}
})

let SearchModule = (props) => {
  const { 
    search_key,
    handleSearchKeyChange,
    search_val,
    handleSearchValChange,
    searchHandler,
    classes
  } = props;
  
  return (
    <Grid container alignItems="center">
      <Grid item >
        <Select value={search_key} onChange={handleSearchKeyChange} className={classes.select} >
          {
            ordersConstant.search.map((s, i) => {
              return <MenuItem value={s.value} key={i}>{s.label}</MenuItem>
            })
          }
        </Select>
      </Grid>
      <Grid item >
        <TextField id="search_val" value={search_val} onChange={handleSearchValChange} margin="none" className={classes.textField} />
      </Grid>
      <Grid item ><Search className={classes.searchIcon} onClick={searchHandler} /></Grid>
    </Grid>
  )
}

SearchModule = withStyles(styles)(SearchModule);

module.exports = SearchModule;

