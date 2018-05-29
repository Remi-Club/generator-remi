function saveAPI(d){
	if(window.windState && window.windState.saveAPI){
		window.windState.saveAPI(d);
		saveAPI = window.windState.saveAPI;
	}
}
function saveBuss(d){
	if(window.windState && window.windState.saveBuss){
		window.windState.saveBuss(d);
		saveBuss = window.windState.saveBuss;
	}
}

module.exports = {
	saveAPI: saveAPI,
	saveBuss: saveBuss
};
