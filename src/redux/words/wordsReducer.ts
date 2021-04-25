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

export const loginOrRegistration = (username: string, password: string) => async (dispatch: Dispatch) => {
	await dispatch(appActions.setLoading(true))
	const loginRes = await AuthAPI.login(username, password)

	if(loginRes.statusCode === 200) {
		console.log('ok')
		await dispatch(authActions.setErrorTextAC(''))
	} else {
		const registrationRes = await AuthAPI.registration(username, password)

		if(registrationRes.statusCode === 200) {
			console.log('Успешно зарегистрирован')
			await dispatch(authActions.setErrorTextAC(''))
		} else {
			const errorText: Array<string> = [];
			if(registrationRes.errors) {
				registrationRes.errors.forEach((err: IErrorObj) => errorText.push(err.msg))
			} else {
				errorText.push(registrationRes.message)
			}
			console.log(errorText)
			await dispatch(authActions.setErrorTextAC(errorText.join('\n')))
		}
	}
	await dispatch(appActions.setLoading(false))
}

type InitialStateType = typeof initialState
type GlobalErrorType = { isError: boolean, errorTitle: string, errorText: string }
type AppActionTypes = ActionsTypes<typeof authActions>
interface IErrorObj {location: string, msg: string, param: string, value: string}
