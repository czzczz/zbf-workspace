import { b64ToUtf8, utf8ToB64 } from './base64';

test('base64', () => {
	expect(utf8ToB64('那当然')).toBe('6YKj5b2T54S2');
	expect(b64ToUtf8(utf8ToB64('那当然'))).toBe('那当然');
});
