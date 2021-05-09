import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Spinner} from '@ui-kitten/components'
import {wrapperPadding} from '../constants'

export const Loader = ({}) => {
	return (
		<View style={s.overlay}>
			<Spinner size='large' status={'warning'}/>
		</View>
	)
}

const s = StyleSheet.create({
	overlay: {
		flex: 1,
		zIndex: 100,
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		paddingHorizontal: wrapperPadding,
		backgroundColor: `rgba(16, 20, 35, 0.5)`
	}
})
