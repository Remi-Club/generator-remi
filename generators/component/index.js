const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
		this.argument('name', { type: String, required: true });
	}
	prompting(){
		// return this.prompt([{
		// 	name: 'name',
		// 	message: 'Please input component name?',
		// }]).then((answers) => {
		// 	this.answers = answers;
		// });
	}
	writing() {
		// let {name} = this.answers;
		let name = this.options.name;
		this.fs.copyTpl(
			this.templatePath('Component'),
			this.destinationPath(`${name}`),
			{name}
		);
	}
	end() {
		this.log(chalk.green('Done'));
	}
};
