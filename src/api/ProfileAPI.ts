import API from './APIService'
import {IResponseWithWords} from './types'

class ProfileAPI {
	getMyWords = () => API.get<IResponseWithWords>('/api/myWords')
}

export default new ProfileAPI()
