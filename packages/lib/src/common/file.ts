import { isBrowser } from 'env';
import { b64ToUtf8 } from './base64';
import { isArray } from './type';

export function downloadFile(filename: string, content: BlobPart | BlobPart[]): HTMLIFrameElement | null {
	if (!isBrowser()) return null;
	const blob = new Blob(isArray(content) ? content : [content]);
	const download = document.createElement('iframe');
	download.style.display = 'none';
	download.src = URL.createObjectURL(blob);
	const body = document.querySelector('body');
	if (!body) return console.error('body not found'), null;
	return body.appendChild(download);
}

export function displayVideo(playerEl: HTMLVideoElement): void {
	const URL = window.URL || window.webkitURL;
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'images/mp4.mp4', true);
	xhr.responseType = 'blob';
	xhr.onload = () => {
		if (xhr.status == 200) {
			playerEl.onload = () => {
				URL.revokeObjectURL(playerEl.src);
			};
			playerEl.src = URL.createObjectURL(xhr.response);
		}
	};
	xhr.send();
}

export function dataURLtoBlob(data: string): Blob | null {
	const [prefix, base64Str] = data.split(',');
	const mime = prefix.match(/:(.*?);/)?.[1];
	if (!mime) return console.error('mime not found'), null;
	const bStr = b64ToUtf8(base64Str);
	const u8Arr = new Uint8Array(bStr.length);
	for (let i = 0; i < bStr.length; i++) u8Arr[i] = bStr.charCodeAt(i);

	return new Blob([u8Arr], { type: mime });
}

export function dataURLtoFile(data: string, filename: string): File | null {
	const blob = dataURLtoBlob(data);
	return blob && new File([blob], filename, { type: blob.type });
}

export function blobToDataURL(blob: Blob, callback: (e: unknown) => void): void {
	const a = new FileReader();
	a.onload = function (e) {
		callback(e.target);
	};
	a.readAsDataURL(blob);
}
