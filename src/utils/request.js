import { REQUEST_TIMEOUT } from './constants';

function getResponseData(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
}

// Обёртка над fetch: прерывает запрос по таймауту и нормализует ошибки.
// Промис реджектится либо числом (HTTP-статус), либо строкой 'network'
// (сервер недоступен, нет соединения или превышен таймаут).
export default function request(url, options = {}) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

	return fetch(url, { ...options, signal: controller.signal })
		.then(getResponseData)
		.catch((err) => {
			if (typeof err === 'number') {
				return Promise.reject(err);
			}
			return Promise.reject('network');
		})
		.finally(() => clearTimeout(timeoutId));
}
