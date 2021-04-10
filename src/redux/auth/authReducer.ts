import {ActionsTypes} from '../store'
import {returnState} from '../../functions'
import {Dispatch} from 'redux'
import {appActions} from '../app/appReducer'
import AuthAPI from '../../api/AuthAPI'

let initialState = {
	logged: false, loading: false, errorText: ''
}

export const authReducer = (state = initialState, action: AppActionTypes): InitialStateType => {
	switch (action.type) {
		case 'SET_IS_LOGGED':
			return returnState(state, action, 'logged', 'isLogged')
		case 'SET_ERROR_TEXT':
			return returnState(state, action, 'errorText')
		case 'SET_IS_LOADING':
			return returnState(state, action, 'loading', 'isLoading')
		default:
			return state
	}
}

export const authActions = {
	loginAC: (username: string, password: string) => ({type: 'LOGIN', username, password} as const),
	setIsLoggedAC: (isLogged: boolean) => ({type: 'SET_IS_LOGGED', isLogged} as const),
	setLoadingAC: (isLoading: boolean) => ({type: 'SET_IS_LOADING', isLoading} as const),
	setErrorTextAC: (errorText: string) => ({type: 'SET_ERROR_TEXT', errorText} as const),
	checkIsLogged: () => ({type: 'CHECK_IS_LOGGED'} as const),
}

export const login = (username: string, password: string) => async (dispatch: Dispatch) => {
	await dispatch(appActions.setLoading(true))
	const res = await AuthAPI.login(username, password)

	if(res.statusCode === 200) {
		console.log('ok')
	} else {
		authActions.setErrorTextAC(res.message)
	}
	await dispatch(appActions.setLoading(false))
}

type InitialStateType = typeof initialState
type GlobalErrorType = { isError: boolean, errorTitle: string, errorText: string }
type AppActionTypes = ActionsTypes<typeof authActions>
