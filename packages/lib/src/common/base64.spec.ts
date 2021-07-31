import { b64ToUtf8, utf8ToB64 } from './base64';

test('base64', () => {
	expect(utf8ToB64('那当然')).toBe('JUU5JTgyJUEzJUU1JUJEJTkzJUU3JTg0JUI2');
	expect(b64ToUtf8(utf8ToB64('那当然'))).toBe('那当然');
});
