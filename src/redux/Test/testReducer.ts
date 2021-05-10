import {ActionsTypes} from '../store'
import {Dispatch} from 'redux'
import WordsAPI from '../../api/WordsAPI'
import {IWord, StatusCodes} from '../../types'
import {appActions} from '../App/appReducer'

const initialState: InitialStateType = {wordsForTest: [], loading: false}

export const testReducer = (state = initialState, action: AppActionTypes) => {
	switch (action.type) {
		case 'TEST/SET_WORDS_FOR_TEST':
			return {...state, wordsForTest: action.words}
		default:
			return state
	}
}

export const testActions = {
	setWordsForTestAC: (words: Array<IWord>) => ({type: 'TEST/SET_WORDS_FOR_TEST', words} as const),
	getWordsForTestAC: () => ({type: 'TEST/GET_WORDS_FOR_TEST'} as const),
}

export const getWordsForTest = () => async (dispatch: Dispatch) => {
	await dispatch(appActions.setLoading(true))
	const wordsForTest = await WordsAPI.getWordsForTest()
	if(wordsForTest.statusCode === StatusCodes.success) {
		await dispatch(testActions.setWordsForTestAC(wordsForTest.words))
	}
	await dispatch(appActions.setLoading(false))
}

export const clearWordsForTest = () => async (dispatch: Dispatch) => {
	await dispatch(testActions.setWordsForTestAC([]))
}

type InitialStateType = { wordsForTest: Array<IWord>, loading: boolean }
type AppActionTypes = ActionsTypes<typeof testActions>

