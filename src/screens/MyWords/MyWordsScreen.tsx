import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {Loader} from '../../components/Loader'
import {useNavigation} from '@react-navigation/native'
import {bgColor, bgColorDark, fontBold, width} from '../../constants'
import {IWord} from '../../types'
import {useLoading} from '../../hooks'
import ProfileAPI from '../../api/ProfileAPI'

export const MyWordsScreen = ({}) => {
	const [loading, setLoading] = useLoading()
	const navigation = useNavigation()

	const [myWords, setMyWords] = useState<Array<IWord>>([])

	useEffect(() => {
		getMyWords()
	}, [])

	const getMyWords = async () => {
		setLoading(true)
		const res = await ProfileAPI.getMyWords()
		setMyWords(res.words)
		setLoading(false)

	}

	const renderWord = (el: { item: IWord, index: number, separators: any }) => {
		const {item, index} = el

		return <View style={s.wordItem}>
			<Text style={s.wordIndex}>{index + 1}.</Text>
			<View style={s.wordInfo}>
				<Text style={[s.word, s.engWord]}>{item.word.toLowerCase()}</Text>
				<Text style={s.delimiter}>—</Text>
				<Text
					style={[s.word, s.rusWords]}>{item.translate.split(',').map(w => w.toLowerCase()).join(', ')}</Text>
			</View>
		</View>
	}

	return (
		<>
			{loading && <Loader/>}
			<View style={[s.container]}>
				<View style={s.scrollWrapper}>
					<FlatList
						renderItem={renderWord}
						keyExtractor={item => item.id.toString()}
						data={myWords}/>
				</View>
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
	wordItem: {
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: bgColorDark,
		width: '100%',
		marginBottom: 5,
		paddingHorizontal: width / 30
	},
	wordIndex: {
		marginRight: 10,
	},
	word: {
		fontSize: 16,
	},
	wordInfo: {
		flexDirection: 'row',
	},
	engWord: {
		fontFamily: fontBold
	},
	delimiter: {
		paddingHorizontal: 5
	}
})
