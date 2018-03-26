const initialState = {
  "orders": [],
  "loading": false,
  "loaded": true,
  "ui_error": false,
  "isLoggedIn": false,
  "isTokenActive": false
};

export default (state = initialState, action) => {

  switch (action.type) {
  case 'CUSTOMER_GET_ORDERS_PENDING':
    state = {
      ...state,
      loading: true,
      loaded: false
    };

    return state;
    break;

  case 'CUSTOMER_GET_ORDERS_FULFILLED':
    // console.log(action);
    let newState = state;
    const orders = action.payload.data.map((item, index)=>{
      item.id = index;
      return item;
    });
    newState.orders.push(orders);
    newState.loaded = true;
    newState.loading = false;
    return newState;
    break;
  }

  return state;
}