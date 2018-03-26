import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers/index';
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

/*
// Centralized application state
// For more information visit http://redux.js.org/
const store = createStore((state, action) => {
  // TODO: Add action handlers (aka "reduces")
  switch (action) {
    case 'COUNT':
      return { ...state, count: (state.count || 0) + 1 };
    default:
      return state;
  }
});*/


const store = createStore(
  allReducers, {},
  applyMiddleware(createLogger(), thunk, promise())
);

// store.subscribe(() => {
//  console.log(store.getState());
// });


// store.dispatch({
// 	type: 'ADD', 
// 	payload: new Promise((resolve, reject)=>{
// 		setTimeout(()=>{
// 			console.log('In setTimeout');
// 			resolve(10);
// 		}, 4000)
// 	})
// });

// store.dispatch({type: 'ADD', payload: 2});
// store.dispatch({type: 'ADD', payload: 3});

export default store;
