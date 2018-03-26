const initialState = {
  "user": {},
  "loading": false,
  "loaded": true,
  "ui_error": false,
  "isLoggedIn": false,
  "isTokenActive": false
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'LOGIN_USER_PENDING':
      state = {
        ...state,
        name: 'Yugal Jain',
        loading: true,
        loaded: false
      };

      return state;
      break;
    case 'LOGIN_USER_FULFILLED':
      state = {
        ...state,
        name: 'Yugal',
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token,
        isTokenActive: action.payload.isTokenActive,
        loading: false,
        loaded: true
      };

      return state;
      break;
  }

  return state;
}

