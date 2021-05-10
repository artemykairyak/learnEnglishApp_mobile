import API from './APIService'
import {IResponse, IResponseWithWords} from './types'

class WordsAPI {
	getAllWords = () => API.get<IResponseWithWords>('/api/Words');
	getWordsForTest = () => API.get<IResponseWithWords>('/api/wordsForTest');
	getWordsByIds = (ids: Array<number>) => API.get<IResponseWithWords>(`/api/wordsByIds/[${ids.toString()}]`);
	addWord = (word: string, translate: string) => API.post<IResponse>('/api/Words', {word, translate});
}

export default new WordsAPI();
