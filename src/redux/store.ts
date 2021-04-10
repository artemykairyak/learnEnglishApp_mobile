import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './app/appReducer'
import {authReducer} from './auth/authReducer'

let rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer
});

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type InferActionTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<InferActionTypes<T>>
