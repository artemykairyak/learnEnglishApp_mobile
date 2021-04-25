import {AppStateType} from './redux/store'
import {Text, StyleSheet} from 'react-native'
import React from 'react'
import {font, infoColor} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function returnState(state, action, stateKey, actionKey) {
	console.log(state, action, stateKey, actionKey);
	return {
		...state,
		[stateKey]: action[!actionKey ? stateKey : actionKey]
	}
}

// export function returnState<InitialStateType, T>(state: InitialStateType, action: T, stateKey: string, actionKey?: string): InitialStateType {
// 	console.log(action, stateKey === actionKey, stateKey, actionKey);
//
// 	return {
// 		...state,
// 		// @ts-ignore
// 		[stateKey]: action[!actionKey ? stateKey : actionKey]
// 	}
// }

export const typography = () => {
	const oldTextRender = Text.render
	Text.render = function(...args) {
		const origin = oldTextRender.call(this, ...args)
		return React.cloneElement(origin, {
			style: [styles.defaultText, origin.props.style],
		})
	}
}

const styles = StyleSheet.create({
	defaultText: {
		fontFamily: font,
		color: infoColor
	}
});

export const setDataToAsyncStorage = async (key, value) => {
	console.log('set', key, value);
	try {
		await AsyncStorage.setItem(key.toString(), value.toString());
	} catch (e) {
		return e;
	}
};

export const setObjToAsyncStorage = async (key, value) => {
	console.log(key, value);
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		return e;
	}
};

export const getDataFromAsyncStorage = async (key) => {
	console.log('get');
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return value;
		}
	} catch (e) {
		return error;
	}
};


export const getObjFromAsyncStorage = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue;
	} catch (e) {
		return e;
	}
};

export const removeDataFromAsyncStorage = async (key) => {
	try {
		await AsyncStorage.removeItem('key');
	} catch (e) {
		return e;
	}
};

export const getRandomNumberInRange = (min = 0, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)

	return Math.floor(Math.random() * (max - min + 1)) + min;
}
