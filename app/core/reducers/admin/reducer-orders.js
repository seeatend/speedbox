const initialState = {
  loading: false,
  loaded: true,
  payloadCount: 0,
  orders: [],
  orders_count: 0,
  ui_error: false,
  ui_loading: false,
  filters: {
    sortBy: '',
    filterBy: '',
  },
  activePageNumber: 1,
  pagination: [],
}

export default (state = initialState, action) => {

  switch (action.type) {
    case 'ADMIN_GET_ORDERS_PENDING' || 'ADMIN_GET_ORDERS':
      state = {
        ...state,
        loading: true,
        loaded: false
      };

      return state;
      break;

    case 'ADMIN_GET_ORDERS_FULFILLED':
      const orders = action.payload.data.map((item, index)=>{
        item.id = index;
        return item;
      });
      state = {
        ...state,
        orders: orders,
        loading: false,
        loaded: true
      };

      return state;
      break;
  }

  return state;
}