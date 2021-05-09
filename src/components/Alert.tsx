import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from '@ui-kitten/components'
import {bgColor, errorColor, infoColor, successColor, width, wrapperPadding} from '../constants'
import {AlertType} from '../types'

interface IAlertProps {
	text: string,
	type: AlertType,
	onClose: () => void
}

export const Alert: React.FC<IAlertProps> = ({type, text, onClose}) => {
	return (
		<TouchableOpacity style={s.overlay} onPress={onClose}>
			<View style={s.alert}>
				<TouchableOpacity style={s.closeIconBtn} onPress={onClose}>
					<Icon name={'close-outline'} fill={'black'} style={s.closeIcon}/>
				</TouchableOpacity>
				<Icon style={s.icon} fill={type === 'success' ? successColor : errorColor}
					  name={type === 'success' ? 'checkmark-circle-outline' : 'alert-triangle-outline'}/>
				<Text style={s.text}>{text}</Text>
			</View>
		</TouchableOpacity>
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
		paddingHorizontal: wrapperPadding
	},
	alert: {
		position: 'relative',
		width: '100%',
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: infoColor,
		paddingHorizontal: width / 30,
		paddingVertical: width / 15,
		elevation: 5,
		borderRadius: 10
	},
	icon: {
		width: 50,
		height: 50,
		marginBottom: 15
	},
	text: {
		color: bgColor
	},
	closeIconBtn: {
		position: 'absolute',
		top: 0,
		right: 0,
		paddingTop: 5,
		paddingRight: 5,
		paddingBottom: 10,
		paddingLeft: 10
	},
	closeIcon: {
		width: 30,
		height: 30
	}
})
