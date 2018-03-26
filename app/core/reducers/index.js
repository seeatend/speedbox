import { combineReducers } from 'redux';

// admin reducers

// app reducers
import users from "./app/reducer-users";
import posts from "./app/reducer-users";

// customer reducers
import cOrders from "./customer/reducer-orders";

// admin reducers
import aOrders from "./admin/reducer-orders";

const allReducers = combineReducers({
  user: users,
  post: posts,
  cOrders: cOrders,
  aOrders: aOrders
})


export default allReducers;