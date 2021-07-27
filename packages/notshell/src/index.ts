import { Command } from 'commander';
import sh from 'shelljs';
/* eslint-disable */
const pack = require('../package.json');
import commands, { commandNames } from './commands';
import { doShell } from './tools/doShell';
const program = new Command();

program
	.version(
		`
 __    __              __             ______   __                  __  __ 
/  \  /  |            /  |           /      \ /  |                /  |/  |
$$  \ $$ |  ______   _$$ |_         /$$$$$$  |$$ |____    ______  $$ |$$ |
$$$  \$$ | /      \ / $$   |        $$ \__$$/ $$      \  /      \ $$ |$$ |
$$$$  $$ |/$$$$$$  |$$$$$$/         $$      \ $$$$$$$  |/$$$$$$  |$$ |$$ |
$$ $$ $$ |$$ |  $$ |  $$ | __        $$$$$$  |$$ |  $$ |$$    $$ |$$ |$$ |
$$ |$$$$ |$$ \__$$ |  $$ |/  |      /  \__$$ |$$ |  $$ |$$$$$$$$/ $$ |$$ |
$$ | $$$ |$$    $$/   $$  $$/       $$    $$/ $$ |  $$ |$$       |$$ |$$ |
$$/   $$/  $$$$$$/     $$$$/         $$$$$$/  $$/   $$/  $$$$$$$/ $$/ $$/ 
                                                                          
Not Shell v${pack.version}`,
	)
	.name('nsh');

for (let {
	info: { name, description = '', alias = '', options = {} },
	handler,
} of commands) {
	// command 返回一个新的实例，要添加参数需要暂存该对象
	let comm = program.command(name);
	for (const oKey of Object.keys(options)) comm = comm.option(oKey, options[oKey]);
	comm.description(description).alias(alias).action(handler);
}

program.on('command:*', (cmd, opt) => {
	// 不是本指令的子命令，直接重定向给shelljs
	if (!commandNames.includes(cmd[0])) {
		doShell(cmd, opt);
	}
});

program.parseAsync(process.argv);
