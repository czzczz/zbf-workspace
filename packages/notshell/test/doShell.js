const queue = require('../dist/tools/doShell').default;
const getCurrentBranch = require('../dist/tools/git').getCurrentBranch;

// queue({ cmdList: ['git fetch'].map(c => ({ cmd: c, opt: { silent: true } })), idx: 0, resultList: [] });

getCurrentBranch().then(res => {
	console.log(res);
});
