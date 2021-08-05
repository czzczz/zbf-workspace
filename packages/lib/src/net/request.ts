interface InitOpt {
	baseUrl?: string;
}

type RequestOpt<Params extends BodyInit> = RequestInit & {
	info: string;
	type?: string;
	data?: Params;
	cancelOld?: boolean;
};

export class FetchCenter {
	baseUrl: string;
	queue: Map<string, Set<AbortController>>;

	constructor(opt?: InitOpt) {
		this.baseUrl = opt?.baseUrl || '';
		this.queue = new Map();
	}

	req<Res, Params extends BodyInit>(config: RequestOpt<Params>): Promise<Res | null> {
		const info =
			typeof config.info === 'string' && /^http/.test(config.info) ? this.baseUrl + config.info : config.info;
		const controller = new AbortController();
		const opt: RequestInit = {
			...config,
			method: config.type || config.method,
			signal: controller.signal,
		};

		if (!this.queue.has(info)) this.queue.set(info, new Set());
		if (config.cancelOld) {
			this.queue.get(info)?.forEach(cont => cont.abort());
			this.queue.get(info)?.clear();
		}
		this.queue.get(info)?.add(controller);

		return fetch(info, opt)
			.then(
				res => {
					return res.json() as unknown as Res;
				},
				err => {
					console.error(err);
					return null;
				},
			)
			.finally(() => {
				this.queue.get(info)?.delete(controller);
			});
	}
}

export function http(url: string): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.timeout = 5000;
		xhr.ontimeout = () => {
			console.error('timeout', url);
		};
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4)
				if ([200, 201, 304].includes(xhr.status)) resolve(JSON.parse(xhr.responseText));
				else reject(new Error(xhr.statusText));
		};
		xhr.send();
	});
}
