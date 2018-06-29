import React from "react";
import { withStyles } from 'material-ui/styles';
import { Button  } from 'material-ui';

import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const styles = theme => ({
	downloadBtn: {
		fontSize: "16px",
		width: "125px",
    padding: "8px 15px"
	},
})

let DownloadBtn = (props) => {
  const { 
    excelData,
    classes
  } = props;
  
  return (
    <div>
        <ExcelFile element={<Button variant="raised" size="small" className={classes.downloadBtn}>DOWNLOAD ARCHIVE</Button>}>
            <ExcelSheet dataSet={excelData} name="Organization"/>
        </ExcelFile>
    </div>
  )
}

DownloadBtn = withStyles(styles)(DownloadBtn);

module.exports = DownloadBtn;

