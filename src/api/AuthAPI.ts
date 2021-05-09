import API from './APIService'

class AuthAPI {
	login = (username: string, password: string) => API.post('/Auth/login', {username, password});
	registration = (username: string, password: string) => API.post('/Auth/registration', {username, password});
}

export default new AuthAPI();
