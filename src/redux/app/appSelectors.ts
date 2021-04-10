import {AppStateType} from '../store'

export const getInitialized = (state: AppStateType) => state.app.initialized
export const getGlobalError = (state: AppStateType) => state.app.globalError
export const getIsLoading = (state: AppStateType) => state.app.loading
