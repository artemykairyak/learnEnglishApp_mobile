import axios from 'axios'
import {BASE_URL, TOKEN_NAME} from '../constants'
import {handleGlobalError} from "../../App";
import {getDataFromAsyncStorage} from '../functions'

class API {
	private readonly tokenName: string | null;
	private url: string;

	constructor(tokenName = TOKEN_NAME) {
		this.url = BASE_URL || '';
		this.tokenName = tokenName;
	}

	handleSuccess = (response: any) => {
		console.log('res', response)
		if (response.data.statusCode !== 200) {
			handleGlobalError(response.data.message);
		}
		return response;
	};

	handleError = (error: any) => {
		handleGlobalError(error);
		return Promise.reject(error);
	};

	create = async (headers?: any) => {
		let tokenFromAsyncStorage = await getDataFromAsyncStorage(this.tokenName);
		const headerAuth = tokenFromAsyncStorage && {Authorization: tokenFromAsyncStorage ? `Bearer ${tokenFromAsyncStorage}` : ''};
		const service = axios.create({
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				...headers,
				...headerAuth,
			},
		});
		service.interceptors.response.use(this.handleSuccess, this.handleError);
		service.interceptors.request.use(request => {
			console.log('Starting Request', request);
			return request;
		});

		service.interceptors.response.use(response => {
			console.log('Response:', response);
			return response;
		});

		return service;
	};

	get = async (path = '', headers?: any) => {
		const service = await this.create(headers);

		return service.request({
			method: 'GET',
			url: `${this.url}${path}`,
		})
			.then(res => res.data)
			.catch(err => this.handleError(err));
	};

	post = async (path = '', data = {}, headers?: any) => {
		const service = await this.create(headers);

		return service.request({
			method: 'POST',
			url: `${this.url}${path}`,
			data,
		})
			.then(res => res.data)
			.catch(err => this.handleError(err));
	};

	put = async (path = '', data = {}, headers?: any) => {
		const service = await this.create(headers);

		return service.request({
			method: 'PUT',
			url: `${this.url}${path}`,
			data,
		})
			.then(res => res.data)
			.catch(err => this.handleError(err));
	};

	delete = async (path = '', headers?: any) => {
		const service = await this.create(headers);

		return service.request({
			method: 'DELETE',
			url: `${this.url}${path}`,
		})
			.then(res => res.data)
			.catch(err => this.handleError(err));
	};

	log = (service: any) => {
		service.interceptors.request.use((request: any) => {
			console.log('Starting Request', request);
			return request;
		});

		service.interceptors.response.use((response: any) => {
			console.log('Response:', response);
			return response;
		});
	};
}

export default new API();
