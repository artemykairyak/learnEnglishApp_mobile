import API from './APIService'

class ProfileAPI {
	getMyWords = () => API.get('/api/myWords');
}

export default new ProfileAPI();
