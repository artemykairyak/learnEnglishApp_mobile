import React from 'react'
import * as eva from '@eva-design/eva'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import * as theme from './src/assets/theme.json'
import {SafeAreaView, ScrollView, StatusBar, StyleSheet,} from 'react-native'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import {NavigationContainer} from '@react-navigation/native'
import {globalStyles} from './src/assets/styles/globalStyles'
import {accentColor} from './src/constants'

const App: React.FC = () => {
	return (
		<>
			<IconRegistry icons={EvaIconsPack}/>
			<ApplicationProvider {...eva} theme={theme}>
				<NavigationContainer>
					<>
						<SafeAreaView style={globalStyles.container}>
							<StatusBar backgroundColor={accentColor}/>
							<ScrollView
								contentInsetAdjustmentBehavior="automatic"
								style={s.scroll}>

							</ScrollView>
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
