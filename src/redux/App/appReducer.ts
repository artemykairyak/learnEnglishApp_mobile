import {Dispatch} from 'redux'
import {ActionsTypes} from '../store'
import {returnState} from '../../functions'

let initialState = {
	initialized: false,
	loading: false,
	globalError: {isError: false, errorTitle: '', errorText: ''} as GlobalErrorType,
}

export const appReducer = (state = initialState, action: AppActionTypes): InitialStateType => {
	switch (action.type) {
		case 'APP/SET_INITIALIZED':
			return returnState(state, action, 'initialized', 'isInitialized')
		case 'APP/SET_ERROR':
			return {...state, globalError: action.globalError}
		case 'APP/SET_LOADING':
			return returnState(state, action, 'loading')
		default:
			return state
	}
}

export const appActions = {
	setInitialized: (isInitialized: boolean) => ({type: 'APP/SET_INITIALIZED', isInitialized} as const),
	setErrorAC: (isError: boolean, errorTitle: string, errorText: string) => ({
		type: 'APP/SET_ERROR',
		globalError: {isError, errorTitle, errorText}
	} as const),
	setLoading: (loading: boolean) => ({type: 'APP/SET_LOADING', loading} as const),
}


export const setGlobalError = (isError: boolean, errText: string) => async (dispatch: Dispatch) => {
	await dispatch(appActions.setLoading(false))
	isError ? dispatch(appActions.setErrorAC(true, 'Что-то пошло не так', errText)) :
		dispatch(appActions.setErrorAC(false, '', ''))
}

type InitialStateType = typeof initialState
type GlobalErrorType = { isError: boolean, errorTitle: string, errorText: string }
type AppActionTypes = ActionsTypes<typeof appActions>
