export interface CommandConfigOptions {
	[key: string]: string;
}

export interface CommandConfigInfo {
	name: string;
	description?: string;
	alias?: string;
	options?: CommandConfigOptions;
}

export type CommandConfigHandler = (...args: any[]) => void | Promise<void>;

export interface CommandConfigItem {
	info: CommandConfigInfo;
	handler: CommandConfigHandler;
}

const commands: CommandConfigItem[] = [
	{
		info: {
			name: 'initConfig',
			description: 'init project config files',
			alias: 'ic',
		},
		handler: require('./initConfig').default,
	},
	{
		info: {
			name: 'submit [targetBranch]',
			description: 'merge current branch to target',
			alias: 'sm',
			options: {
				'-a, --alpha': 'submit to alpha test env',
				'-b, --beta': 'submit to beta test env',
				'-p, --prod': 'submit to prod env',
			},
		},
		handler: require('./submit').default,
	},
	{
		info: { name: 'where', description: 'get dir info of project' },
		handler: require('./where').default,
	},
	{
		info: {
			name: 'npm-reg [registry]',
			description: 'change npm source',
			options: {
				'-l, --list': 'list all useable registry',
				'-c, --choose <source>': 'choose a registry source can list',
				'-y, --yarn': 'also set yarn registry',
			},
		},
		handler: require('./npm-reg').default,
	},
	{
		info: {
			name: 'remove <target...>',
			description: 'remove target files or dirs',
			options: {
				'-r, --recursive': 'recursively remove child of target dir',
				'-f, --force': 'force remove without warning or confirm',
			},
			alias: 'rm',
		},
		handler: require('./remove').default,
	},
	{
		info: {
			name: 'link <source> <dest>',
			description: 'create symbolic link from source file (or dir) to dest',
			options: {
				'-f, --force': 'force create',
			},
			alias: 'ln',
		},
		handler: require('./link').default,
	},
];

commands.sort((a, b) => (a.info.name < b.info.name ? -1 : 1));

export const commandNames = commands.map(item => {
	return item.info.name.split(' ')[0];
});

export default commands;
