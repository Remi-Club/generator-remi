var webpack = require('webpack');
var config = require('./webpack_build.config.js');
var exec = require('child_process').exec;
var fs = require('fs');
const chalk = require('chalk');

main();

function main() {
	compile();
}

function compile() {
	var compiler = webpack(config);

	compiler.run(function(err, stats) {
		// console.log(stats.toString({colors: true}));
		if (err)
			return handleFatalError(err);
		var jsonStats = stats.toJson();
		if (jsonStats.errors.length > 0) {
			return handleSoftErrors(jsonStats.errors);
		}
		// if (jsonStats.warnings.length > 0) {
		// 	handleWarnings(jsonStats.warnings);
		// }
		successfullyCompiled(jsonStats);
	});
}

function successfullyCompiled(jsonStats) {
	console.log(chalk.green('Completed compile'));
	var assetsByChunkName = jsonStats.assetsByChunkName;
	// console.log(assetsByChunkName);

	exec('cp -rf ./src/index.html ./dist/', function(err, stdout, stderr) {
		if (err) throw err;
		changeFileName(assetsByChunkName);
	});
}

function changeFileName(assetsByChunkName) {
	var targetFile = ['./dist/index.html'];

	var entry = assetsByChunkName.entry;

	var RE_ENTRY = /dist\/entry\.bundle\.js/;

	for (var i = 0, len = targetFile.length; i < len; i++) {
		var fileName = targetFile[i];
		reWrite(fileName, entry, RE_ENTRY);
	}

	function reWrite(fileName, entry, re) {
		if (Object.prototype.toString.call(entry) === '[object Array]') {
			entry = entry[0];
		}
		fs.readFile(fileName, {
			encoding: 'utf8'
		}, function(err, data) {
			if (err) throw err;
			var d = data.replace(re, entry);
			fs.writeFile(fileName, d, function(err) {
				if (err) throw err;
				console.log(chalk.green('  - saved ' + fileName));
			});
		});
	}
}

function handleFatalError(err) {
	console.log(chalk.red('Error:' + err));
}

function handleSoftErrors(err) {
	console.log(chalk.red('Softerror:' + err));
}

function handleWarnings(err) {
	console.log(chalk.yellow('Warnings:' + err));
}
