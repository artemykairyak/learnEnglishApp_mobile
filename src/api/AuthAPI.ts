import API from './APIService'

class AuthAPI {
	login = (username: string, password: string) => API.post('/auth/login', {username, password});
	// registration = (payload) => API.post('/auth/registration', payload);
}

export default new AuthAPI();
