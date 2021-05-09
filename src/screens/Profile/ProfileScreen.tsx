import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Loader} from '../../components/Loader'
import {bgColor, infoColor} from '../../constants'
import {useSelector} from 'react-redux'
import {getIsLoading} from '../../redux/App/appSelectors'
import {Icon, Menu, MenuItem} from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native';

const ProfileIcon = () => (
	<Icon name='person' fill={infoColor} style={{width: 25, height: 25}}/>
);

const MyWordsIcon = () => (
	<Icon name='keypad' fill={infoColor} style={{width: 25, height: 25}}/>
);

export const ProfileScreen: React.FC = ({}) => {
	const loading = useSelector(getIsLoading)
	const navigation = useNavigation()

	return (
		<>
			{loading && <Loader/>}
			<View style={[s.container]}>
				<Menu style={s.menu}>
					<MenuItem title='Профиль' accessoryLeft={ProfileIcon} />
					<MenuItem title='Мои слова' accessoryLeft={MyWordsIcon} onPress={() => navigation.navigate('MyWords')}/>
				</Menu>
			</View>
		</>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: bgColor,
		position: 'relative',
	},
	menu: {
		flex: 1,
		margin: 8,
	},
})
