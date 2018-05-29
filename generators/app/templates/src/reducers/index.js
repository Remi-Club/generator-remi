let Redux = require('redux');
import Thunk from 'redux-thunk';

function generatorModel(name){
	const DEFAULT_STATE = {};
	return function (state, action) {
		switch (action.type) {
	        case `${name}_SET`:
	            return {...action.data};
	        case `${name}_UPDATE`:
	            return {...state, ...action.data};
	        case `${name}_CLEAR`:
	            return DEFAULT_STATE;
	        default:
	            return state || DEFAULT_STATE;
	    }
	}
}

function generatorModelList(name){
	const DEFAULT_STATE = [];
	DEFAULT_STATE.pageNo = 0; //当前页号
	return function (state, action) {
		let newState = [];
		switch (action.type) {
	        case `${name}_LIST_SET`:
	            newState.push(...action.data);
	            newState.pageNo = 1;
	            return newState;
	        case `${name}_LIST_PUSH`:
	            newState.push(...state);
	            newState.push(...action.data);
	            newState.pageNo = state.pageNo + 1;
	            return newState;
	        case `${name}_LIST_CLEAR`:
	            return DEFAULT_STATE;
	        default:
	            return state || DEFAULT_STATE;
	    }
	}
}

let reducers = Redux.combineReducers({
    user: generatorModel('USER'),
});

let store = Redux.createStore(reducers, Redux.applyMiddleware(Thunk));

export default store;
