import {ActionsTypes} from '../store'
import {Dispatch} from 'redux'
import {IWord, StatusCodes} from '../../types'
import ProfileAPI from '../../api/ProfileAPI'
import {appActions} from '../App/appReducer'

const initialState: InitialStateType = {profile: [], loading: false, myWords: []}

export const profileReducer = (state = initialState, action: AppActionTypes) => {
	switch (action.type) {
		case 'PROFILE/SET_PROFILE':
			return {...state, profile: action.profile}
		case 'PROFILE/SET_MY_WORDS':
			return {...state, words: action.words}
		default:
			return state
	}
}

export const profileActions = {
	setProfileAC: (profile: any) => ({type: 'PROFILE/SET_PROFILE', profile} as const),
	setMyWordsAC: (words: Array<IWord>) => ({type: 'PROFILE/SET_MY_WORDS', words} as const),
	getWordsForTestAC: () => ({type: 'PROFILE/GET_WORDS_FOR_TEST'} as const),
}

export const getMyWords = () => async (dispatch: Dispatch) => {
	await dispatch(appActions.setLoading(true))
	const myWords = await ProfileAPI.getMyWords()
	if (myWords.statusCode === StatusCodes.success) {
		await dispatch(profileActions.setMyWordsAC(myWords.words))

	}
	await dispatch(appActions.setLoading(false))
}

type InitialStateType = { profile: Array<any>, loading: false, myWords: Array<IWord> }
type AppActionTypes = ActionsTypes<typeof profileActions>

