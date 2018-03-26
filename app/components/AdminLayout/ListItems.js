
import React from 'react';

import { Link, Route } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Tooltip from 'material-ui/Tooltip';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import HelpIcon from 'material-ui-icons/Help';
import SwapHorizIcon from 'material-ui-icons/SwapHoriz';
import AccountBalanceWalletIcon from 'material-ui-icons/AccountBalanceWallet';
import EqualizerIcon  from 'material-ui-icons/Equalizer';
import BackupIcon from 'material-ui-icons/Backup';
import FaceIcon from 'material-ui-icons/Face';
import Group from 'material-ui-icons/Group';
import WorkIcon from 'material-ui-icons/Work';
import HomeIcon from 'material-ui-icons/Home';

// import SellerOrders from '../SellerOrders';
// import Header from '../Header';

export const mailFolderListItems = (
  <div id="drawerLinks">
    <Link to="/home">
      <ListItem button>
          <ListItemIcon>
             <HomeIcon />
          </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/orders">
      <ListItem button>
          <ListItemIcon>
             <WorkIcon />
          </ListItemIcon>
        <ListItemText primary="Order Mangement" />
      </ListItem>
    </Link>

    <Link to="/customers">
      <ListItem button>
          <ListItemIcon>
             <Group />
          </ListItemIcon>
        <ListItemText primary="Cutomers" />
      </ListItem>
    </Link>

    <Link to="/rate-management">
      <ListItem button>
          <ListItemIcon>
             <BackupIcon />
          </ListItemIcon>
        <ListItemText primary="Rate Management" />
      </ListItem>
    </Link>
    
    <Link to="/stats">
      <ListItem button>
          <ListItemIcon>
             <EqualizerIcon />
          </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItem>
    </Link>
    
    <Link to="/billing">
      <ListItem button>
          <ListItemIcon>
             <AccountBalanceWalletIcon />
          </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItem>
    </Link>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SwapHorizIcon />
      </ListItemIcon>
      <ListItemText primary="Switch System" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HelpIcon/>
      </ListItemIcon>
      <ListItemText primary="Support" />
    </ListItem>
  </div>
);