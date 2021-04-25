import API from './APIService'

class AuthAPI {
	login = (username: string, password: string) => API.post('/auth/login', {username, password});
	registration = (username: string, password: string) => API.post('/auth/registration', {username, password});
}

export default new AuthAPI();
