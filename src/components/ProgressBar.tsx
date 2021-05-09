import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {errorColor, infoColor, successColor, width} from '../constants'

interface IProgressBar {
	totalItems: number,
	itemsMap: Array<boolean>
}

export const ProgressBar: React.FC<IProgressBar> = ({totalItems, itemsMap}) => {
	const [renderedItems, setRenderedItems] = useState<Array<boolean | null>>([])

	useEffect(() => {
		setRenderedItems(new Array(totalItems).fill(null))
	}, [totalItems])

	useEffect(() => {
		setRenderedItems(itemsMap)
	}, [itemsMap])

	return (
		<View style={s.progress}>
			{!!totalItems && renderedItems.map((item, i) => {
				return <View key={i}
							 style={[s.progressItem, {width: width / totalItems}, item === true ? s.successProgressItem : item === false ? s.errorProgressItem : null]}/>
			})}
		</View>
	)
}

const s = StyleSheet.create({
	progress: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 2
	},
	progressItem: {
		height: 7,
		backgroundColor: infoColor,
		opacity: 0.7
	},
	successProgressItem: {
		backgroundColor: successColor,
		opacity: 1
	},
	errorProgressItem: {
		backgroundColor: errorColor,
		opacity: 1
	}
})
