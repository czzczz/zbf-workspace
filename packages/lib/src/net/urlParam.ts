type URLParam = Record<string, string>;

export function parseURLParams(path: string): URLParam {
	const res: URLParam = {};
	path.replace(/([\d\w]+)=([^&?=]*)/g, ($0, $1, $2) => {
		res[$1] = $2;
		return $0;
	});
	return res;
}

export function encodeURLParams(params: Record<string, unknown>): string {
	const pArr: string[] = [];
	Object.keys(params).forEach(k => {
		if (params[k] != null)
			pArr.push(
				`${k}=${typeof params[k] === 'string' ? params[k] : encodeURIComponent(JSON.stringify(params[k]))}`,
			);
	});
	return pArr.join('&');
}
