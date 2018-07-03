import moment from 'moment';
const initialState = {
  loading: false,
  loaded: true,
  payloadCount: 0,
  orders: [],
  orders_count: 0,
  orders_options: {
    searchKey: "orderNo",
    searchVal: "",
    status: "placed",
    fromDate: moment(),
    toDate: moment(),
    cop: false,
    bulk: "",
    selectedOrders: [],
    page: 0,
    rowsPerPage: 5
  },
  bulk_data: "",
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

    case 'ADMIN_ORDERS_BULK_FULFILLED':
      const bulk_data = action.payload.data;
      state = {
        ...state,
        bulk_data: bulk_data
      };

      return state;
      break;

    case 'CLEAN_BULK_DATA':
      state = {
        ...state,
        bulk_data: ""
      };

      return state;
      break;

    case 'SET_OPTIONS_DATA':
      state = {
        ...state,
        orders_options: {
          ...state.orders_options,
          ...action.data
        }
      };

      return state;
      break;
  }

  return state;
}