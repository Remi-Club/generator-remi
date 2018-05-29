var ReactRedux = require('react-redux');
var Actions = require('actions');

function main(box, states = [], dispatches = []) {
	var mapStateToProps = function(state) {
		var result = {};
		states.forEach(function(v) {
			result[v] = state[v];
		});
		return result;
	};
	var mapDispatchToProps = function(dispatch) {
		var result = {};
		dispatches.forEach(function(v) {
			result[v] = function(param) {
				dispatch(Actions[v](param));
			};
		});
		return result;
	};

	return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(box);
}

module.exports = main;
