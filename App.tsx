import React, {useEffect} from 'react'
import * as eva from '@eva-design/eva'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import * as theme from './src/assets/theme.json'
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,} from 'react-native'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import {NavigationContainer} from '@react-navigation/native'
import {globalStyles} from './src/assets/styles/globalStyles'
import {accentColor, font} from './src/constants'
import {BottomTabs} from './src/components/BottomTabs'
import {useDispatch, useSelector} from 'react-redux'
import {getIsLogged} from './src/redux/auth/authSelectors'
import {getInitialized} from './src/redux/app/appSelectors'
import {AuthScreen} from './src/screens/Auth/AuthScreen'
import {store} from './src/redux/store'
import {setGlobalError} from './src/redux/app/appReducer'
import {checkLogin} from './src/redux/auth/authReducer'


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
	color: 'red',
	fontFamily: font
}

export const handleGlobalError = (err: any) => {
	console.log(1111, err)
	store.dispatch<any>(setGlobalError(true, err?.message))
}


const App: React.FC = () => {
	const logged = useSelector(getIsLogged)
	const isInitialized = useSelector(getInitialized)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkLogin())
	}, [])

	useEffect(() => {
		console.log(store.getState())
	}, [store])

	return (
		<>
			<IconRegistry icons={EvaIconsPack}/>
			<ApplicationProvider {...eva} theme={theme}>
				<NavigationContainer>
					<>
						<SafeAreaView style={globalStyles.container}>
							<StatusBar backgroundColor={accentColor}/>
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
