/* eslint-disable no-console */

let superagent = require('superagent');
let config = require('common/config');
import user from 'utils/user';
import eventEmitter from 'utils/eventEmitter';

async function Request({
	url,
	data,
	success,
	fail,
	error,
	type
}) {
	type = this.getType(type),
		url = this.getUrl(url);
	this.url = url;
	let request = new superagent.Request(type, url);
	this.request = request;
	this.addClientType();
	await this.addAuthInfo();
	// request.set('Content-Type', 'application/x-www-form-urlencoded');
	request.set('Accept', 'application/json');
	if (type === 'GET') {
		request.query(data);
	} else {
		request.send(data);
	}
	this.execute({
		success,
		fail,
		error,
		data
	});
}

Request.prototype = {
	constructor: Request,

	getUrl: function (url) {
		if (/^http/.test(url)) {
			return url;
		}
		return url[0] === '/' ? config.API_ROOT + url : config.API_ROOT + '/' + url;
	},
	getType: function (type) {
		type = type ? type.toUpperCase() : 'POST';
		return type === 'GET' ? 'GET' : 'POST';
	},
	addClientType: function () {
		this.request.query({
			p: '<%=name%>'
		});
	},
	addAuthInfo: async function () {
		const userInfo = user.get();
		if (userInfo) {
			const { token } = userInfo;
			this.request.query({
				token,
			});
		}

	},
	execute: function ({
		success,
		fail,
		error,
		data
	}) {
		this.request.end(function (err, res) {
			if (err) {
				console.error('request err:', err);
				error && error();
				return;
			}
			const body = res.body;
			const code = body.code;
			if (code !== 0) {
				if (_isNeedLoginByErrorCode(code)) {
					eventEmitter.emit('NEED_RELOGIN');
					return;
				}
				return fail && fail(body);
			}
			return success && success(body);
		}.bind(this));
	}
};

function _isNeedLoginByErrorCode(v) {
	switch (v) {
		case 40001:
		case 40003:
			return true;
		default:
			return false;
	}
}


let request = {
	get: function (options) {
		options.type = 'GET';
		new Request(options);
	},
	post: function (options) {
		options.type = 'POST';
		new Request(options);
	},
	ajax: function (options) {
		new Request(options);
	}
};

module.exports = request;
