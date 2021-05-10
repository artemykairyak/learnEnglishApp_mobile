import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios'
import {BASE_URL, TOKEN_NAME} from '../constants'
import {handleGlobalError} from '../../App'
import {getDataFromAsyncStorage} from '../functions'
import {StatusCodes} from '../types'
import {IResponse} from './types'

type Headers = { [key: string]: string };

class API {
	private readonly tokenName: string | null
	private url: string

	constructor(tokenName = TOKEN_NAME) {
		this.url = BASE_URL || ''
		this.tokenName = tokenName
	}

	handleSuccess = async <T extends IResponse>({data}: AxiosResponse<T>) => {
		if (data.statusCode !== StatusCodes.success) {
			handleGlobalError(data.message)
		}
		return data
	}

	handleError = (error: AxiosError<IResponse>) => {
		handleGlobalError(error)
		return Promise.reject(error)
	}

	create = async <T>(headers?: Headers): Promise<AxiosInstance> => {
		let tokenFromAsyncStorage = await getDataFromAsyncStorage(this.tokenName)
		const headerAuth = tokenFromAsyncStorage && {Authorization: tokenFromAsyncStorage ? `Bearer ${tokenFromAsyncStorage}` : ''}
		const service: AxiosInstance = axios.create({
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				...headers,
				...headerAuth,
			},
		})
		// service.interceptors.response.use(this.handleSuccess, this.handleError);
		service.interceptors.request.use(request => {
			console.log('Starting Request', request)
			return request
		})

		service.interceptors.response.use(response => {
			console.log('Response:', response)
			return response
		})

		return service
	}

	get = async <T extends IResponse>(path = '', headers?: Headers) => {
		const service = await this.create<T>(headers)

		return service.request<T>({
			method: 'GET',
			url: `${this.url}${path}`,
		})
			.then(res => this.handleSuccess<T>(res))
			.catch(err => this.handleError(err))
	}

	post = async <T extends IResponse>(path = '', data = {}, headers?: Headers) => {
		const service = await this.create(headers)

		return service.request({
			method: 'POST',
			url: `${this.url}${path}`,
			data,
		})
			.then(res => this.handleSuccess<T>(res))
			.catch(err => this.handleError(err))
	}

	put = async <T extends IResponse>(path = '', data = {}, headers?: Headers) => {
		const service = await this.create(headers)

		return service.request({
			method: 'PUT',
			url: `${this.url}${path}`,
			data,
		})
			.then(res => this.handleSuccess<T>(res))
			.catch(err => this.handleError(err))
	}

	delete = async <T extends IResponse>(path = '', headers?: Headers) => {
		const service = await this.create(headers)

		return service.request({
			method: 'DELETE',
			url: `${this.url}${path}`,
		})
			.then(res => this.handleSuccess<T>(res))
			.catch(err => this.handleError(err))
	}

	log = (service: any) => {
		service.interceptors.request.use((request: any) => {
			console.log('Starting Request', request)
			return request
		})

		service.interceptors.response.use((response: any) => {
			console.log('Response:', response)
			return response
		})
	}
}

export default new API()
