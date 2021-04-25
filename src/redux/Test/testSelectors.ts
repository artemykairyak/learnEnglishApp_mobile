import {AppStateType} from '../store'

export const getTestWords = (state: AppStateType) => state.test.wordsForTest
export const getIsWordsForTestLoading = (state: AppStateType) => state.test.loading
