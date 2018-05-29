const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}
	prompting() {
		return this.prompt([{
			name: 'name',
			message: 'Please input project name?',
			default: this.appname // Default to current folder name
		}, {
			name: 'description',
			message: 'Please input project description?'
		}, {
			name: 'port',
			message: 'Please input development port?',
			default: 8081
		}]).then((answers) => {
			this.answers = answers;
		});
	}
	writing() {
		let sourceRoot = this.sourceRoot();
		let destinationRoot = this.destinationRoot();
		this.fs.copyTpl(
			sourceRoot,
			destinationRoot,
			this.answers
		);
		const files = ['.babelrc', '.editorconfig', '.eslintrc', '.gitignore'];
		files.forEach((v) => {
			this.fs.copyTpl(this.templatePath(v), this.destinationPath(v));
		});
	}
	install() {
		// this.npmInstall();
	}
	end() {
		this.log(chalk.green('Completed'));
		this.log(chalk.cyan('In current direction, run:\n    npm install\n    npm start\n'));
	}
};
