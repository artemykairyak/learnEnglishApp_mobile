import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {Button, Text} from '@ui-kitten/components'
import {TestStats} from '../types'
import WordsAPI from '../../../api/WordsAPI'
import {IWord} from '../../../types'
import {fontMedium, height} from '../../../constants'
import {useDispatch} from 'react-redux'
import {appActions} from '../../../redux/App/appReducer'

interface ITestResultProps {
	totalQuestions: number,
	testStats: TestStats,
	closeTest: () => void
}

export const TestResult: React.FC<ITestResultProps> = ({totalQuestions, testStats, closeTest}) => {
	const [wordsToRepeat, setWordsToRepeat] = useState<Array<IWord>>([])
	const dispatch = useDispatch()

	useEffect(() => {
		getWordsToRepeat()
	}, [])

	const getWordsToRepeat = async () => {
		dispatch(appActions.setLoading(true))
		const res = await WordsAPI.getWordsByIds(testStats.errorWords)
		setWordsToRepeat(res.words)
		dispatch(appActions.setLoading(false))
	}

	return (
		<View style={s.testResult}>
			<View style={s.progress}>
				<Text style={s.progressText}>{totalQuestions - testStats.errorWords.length}/{totalQuestions}</Text>
				{!!wordsToRepeat.length && <View>
                    <Text style={s.progressLabel}>Советуем повторить:</Text>
                    <View style={s.scrollContainer}>
                        <ScrollView contentContainerStyle={s.scroll}>{wordsToRepeat.map(word => {
							return <View key={word.id} style={s.repeatWord}>
								<Text style={s.engRepeatWord}>{word.word.toLowerCase()}</Text>
								<Text
									style={s.rusRepeatWords}>({word.translate.split(',').map(w => w.toLowerCase()).join(', ')})</Text>
							</View>
						})}</ScrollView>
                    </View>
                </View>}
				<Button onPress={closeTest} style={s.btn}>Закончить тест</Button>
			</View>
		</View>
	)
}

const s = StyleSheet.create({
	testResult: {
		width: '100%',
		height: '100%'
	},
	progress: {
		flex: 1,
		justifyContent: 'center',
		paddingBottom: 40
	},
	progressText: {
		fontFamily: fontMedium,
		fontSize: 24,
		textAlign: 'center'
	},
	progressLabel: {
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 7
	},
	scrollContainer: {
		maxHeight: height / 1.65,
	},
	scroll: {
		paddingVertical: 15,
	},
	repeatWord: {
		alignItems: 'center',
		paddingBottom: 10
	},
	engRepeatWord: {
		fontSize: 18,
		fontFamily: fontMedium,
		lineHeight: 20
	},
	rusRepeatWords: {
		lineHeight: 16,
		marginTop: 3
	},
	btn: {
		position: 'absolute',
		bottom: 15,
		width: '100%',
	}
})
