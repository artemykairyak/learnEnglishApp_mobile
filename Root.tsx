import React from 'react'
import {StyleSheet} from 'react-native'
import {Provider} from 'react-redux'
import {store} from './src/redux/store'
import App from './App'

console.disableYellowBox = true;

export const Root: React.FC = () => {
	return (
		<Provider store={store}>
			<App/>
		</Provider>)
}

const s = StyleSheet.create({})
