function splitPath(path: string): string[] {
	return path.split('.');
}

export function getData(obj: unknown, path: string): unknown {
	let data = obj;
	for (const prop of splitPath(path)) {
		if (data == null) return data;
		data = (data as Record<string, unknown>)[prop];
	}
	return data;
}
