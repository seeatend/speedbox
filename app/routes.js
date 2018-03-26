import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './pages/app/login/';
import Orders from './pages/admin/orders/';
import Header from './components/Header/';

export const AdminRoutes = (
	<div key="sellerroutes">
		<Route key="home" exact path="/"  render={()=> <h4>Hi, this is Home</h4>}/>
		<Route key="orders" exact path="/orders"  component={Orders}/>
		<Route key="customers" exact path="/customers" component = {Header}/>
		<Route key="rates" exact path="/rate-management"  render={()=> <h4>Upload rates here.</h4>}/>
		<Route key="stats" exact path="/stats"  render={()=> <h4>See your progress here.</h4>}/>
		<Route key="billing" exact path="/billing"  render={()=> <h4>Let's Manage your Billing</h4>}/>
	</div>
);
