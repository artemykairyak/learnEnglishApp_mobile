import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text} from '@ui-kitten/components'
import {SuccessIcon} from '../../../components/Icons/SuccessIcon'
import {AnswerStatus, Mode} from '../types'
import {ErrorIcon} from '../../../components/Icons/ErrorIcon'
import {fontMedium} from '../../../constants'
import {IWord} from '../../../types'

interface IAnswerStatusProps {
	answerStatus: AnswerStatus,
	mode: Mode,
	currentWord: string,
	wordsForTest: Array<IWord>,
	currentQuestion: number,
	nextQuestion: () => void
}

export const AnswerResult: React.FC<IAnswerStatusProps> = ({answerStatus, mode, currentWord, wordsForTest, currentQuestion, nextQuestion}) => {
	if (answerStatus === 'correct') {
		return (
			<View style={s.answerRes}>
				<Text style={[s.answerResTitle, s.correctAnswerResTitle]}><SuccessIcon/></Text>
				<Button onPress={nextQuestion}>Дальше</Button>
			</View>
		)
	}

	return <View style={s.answerRes}>
		<View style={[s.answerResTitle]}><ErrorIcon/></View>
		<View style={s.errorContent}>
			<View style={s.errorTitle}>
				<Text
					style={s.errorWord}>{currentWord.toLowerCase()}</Text>
				<Text style={s.errorLabel}>переводится как:</Text>
			</View>
			<Text style={s.errorVars}>
				{mode === 'eng' ? wordsForTest[currentQuestion - 1].translate.toLowerCase() : wordsForTest[currentQuestion - 1].word.toLowerCase()}
			</Text>
		</View>
		<Button onPress={nextQuestion}>Дальше</Button>
	</View>

}

const s = StyleSheet.create({
	answerRes: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	answerResTitle: {marginVertical: 15},
	correctAnswerResTitle: {
		color: 'forestgreen',
		marginBottom: 30
	},
	errorContent: {
		flexWrap: 'wrap',
		alignItems: 'center'
	},
	errorAnswerResTitle: {color: 'red'},
	errorTitle: {fontSize: 18, flex: 0, flexWrap: 'wrap', alignItems: 'center'},
	errorWord: {
		width: '100%',
		fontSize: 20,
		fontFamily: fontMedium
	},
	errorLabel: {
		marginVertical: 5
	},
	errorVars: {fontSize: 20, fontFamily: fontMedium, marginBottom: 30, width: '100%',},
})
