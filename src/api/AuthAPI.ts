import API from './APIService'
import {IResponse, IResponseWithToken} from './types'

class AuthAPI {
	login = (username: string, password: string) => API.post<IResponseWithToken>('/Auth/login', {username, password});
	registration = (username: string, password: string) => API.post<IResponse>('/Auth/registration', {username, password});
}

export default new AuthAPI();
