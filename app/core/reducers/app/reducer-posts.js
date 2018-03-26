export default (state = [], action) => {

    switch (action.type) {
	  	case 'ADD_FULFILLED':
	  	console.log(action);
	  	  let newState = state;
	  	  newState.push(action.payload);
	  	  return newState;
	  	  break;
  }

  return state;
}

export posts;