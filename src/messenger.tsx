import { StockPosition } from './interfaces';

export function getBearerToken(): Promise<string> {
	return new Promise((resolve, reject) => {
		fetch('https://ibo-financials.com/v1/user?', { method: 'POST' })
			.then(response => response.json())
			.then(data => { resolve( data.token) });
	});
}

export async function getDividendPayments(stockPositions: StockPosition[], bearerToken: string): Promise<string> {
	return new Promise((resolve, reject) => {
		let requestUrl = 'https://ibo-financials.com/v1/dividends/calendar/';
		let symbolQuery = '';
		let sharesQuery = '';

		stockPositions.forEach((position) => {
			symbolQuery += position.symbol + ',';
			sharesQuery += position.shares + ',';
		})

		requestUrl += symbolQuery + '/' + sharesQuery + '/date';

		fetch(requestUrl, { headers: { Authorization: bearerToken } }).then(request => request.json()).then(data => { resolve( data) });

	});
}