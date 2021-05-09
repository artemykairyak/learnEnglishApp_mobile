import React, {useEffect} from 'react'
import * as eva from '@eva-design/eva'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,} from 'react-native'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import {NavigationContainer} from '@react-navigation/native'
import {globalStyles} from './src/assets/styles/globalStyles'
import {accentColor, bgColorDark, font, textColor} from './src/constants'
import {BottomTabs} from './src/components/BottomTabs'
import {useDispatch, useSelector} from 'react-redux'
import {getIsLogged} from './src/redux/Auth/authSelectors'
import {getInitialized, getState} from './src/redux/App/appSelectors'
import {AuthScreen} from './src/screens/Auth/AuthScreen'
import {store} from './src/redux/store'
import {setGlobalError} from './src/redux/App/appReducer'
import {checkLogin} from './src/redux/Auth/authReducer'


// @ts-ignore
TouchableOpacity.defaultProps = {
// @ts-ignore
	...TouchableOpacity.defaultProps,
	activeOpacity: 0.8,
}

// @ts-ignore
Text.defaultProps = {
// @ts-ignore
	...Text.defaultProps,
	color: textColor,
	fontFamily: font
}

export const handleGlobalError = (err: any) => {
	console.log(1111, err)
	store.dispatch<any>(setGlobalError(true, err?.message))
}


const App: React.FC = () => {
	const logged = useSelector(getIsLogged)
	const isInitialized = useSelector(getInitialized)
	const state = useSelector(getState)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkLogin())
	}, [])

	useEffect(() => {
		console.log(state)
	}, [state])

	return (
		<>
			<IconRegistry icons={EvaIconsPack}/>
			<ApplicationProvider {...eva} theme={eva.dark}>
				<NavigationContainer>
					<>
						<SafeAreaView style={globalStyles.container}>
							<StatusBar backgroundColor={bgColorDark}/>
							{logged ?
								<BottomTabs/>
								:
								<AuthScreen/>
							}
						</SafeAreaView>
					</>
				</NavigationContainer>
			</ApplicationProvider>
		</>
	)
}

const s = StyleSheet.create({
	scroll: {}
})

export default App
