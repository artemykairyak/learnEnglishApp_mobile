import {AppStateType} from '../store'

export const getIsLogged = (state: AppStateType) => state.auth.logged
export const getErrorText = (state: AppStateType) => state.auth.errorText
export const getIsLoading = (state: AppStateType) => state.auth.loading
