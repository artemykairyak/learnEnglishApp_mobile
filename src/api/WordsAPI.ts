import API from './APIService'

class WordsAPI {
	getAllWords = () => API.get('/api/Words');
	getWordsForTest = () => API.get('/api/wordsForTest');
	getWordsByIds = (ids: Array<number>) => {
		return API.get(`/api/wordsByIds/[${ids.toString()}]`);
	}
	addWord = (word: string, translate: string) => API.post('/api/Words', {word, translate});
}

export default new WordsAPI();
