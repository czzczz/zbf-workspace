import { parseURLParams, encodeURLParams as encodeParams } from './urlParam';

test('url param methods', () => {
	expect(parseURLParams('abc=1&234=6&bcbc')).toEqual({ abc: '1', 234: '6' });
	expect(parseURLParams('abc=1&234=&bcbc=')).toEqual({ abc: '1', 234: '', bcbc: '' });

	expect(encodeParams({ my: 1, hello: '2344', data: { headers: 'cbx', footer: 1, arr: [] } })).toBe(
		'my=1&hello=2344&data=%7B%22headers%22%3A%22cbx%22%2C%22footer%22%3A1%2C%22arr%22%3A%5B%5D%7D',
	);
	expect(
		parseURLParams(encodeParams({ my: null, hello: '2344,123,56', data: { headers: 'cbx', footer: 1, arr: [] } })),
	).toEqual({
		hello: '2344,123,56',
		data: '%7B%22headers%22%3A%22cbx%22%2C%22footer%22%3A1%2C%22arr%22%3A%5B%5D%7D',
	});
	const pa = parseURLParams(encodeParams({ my: 1, hello: '2344', data: { headers: 'cbx', footer: 1, arr: [] } }));
	expect(JSON.parse(decodeURIComponent(pa.data))).toEqual({ headers: 'cbx', footer: 1, arr: [] });
});
