import API from './APIService'

class WordsAPI {
	getAllWords = () => API.get('/api/words');
	getWordsForTest = () => API.get('/api/wordsForTest');
	addWord = (word: string, translate: string) => API.post('/api/words', {word, translate});
}

export default new WordsAPI();
