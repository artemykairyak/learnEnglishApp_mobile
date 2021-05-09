import {AppStateType} from '../store'

export const getTestWords = (state: AppStateType) => state.test.wordsForTest
