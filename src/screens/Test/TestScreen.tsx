import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Alert} from '../../components/Alert'
import {useAlert} from '../../hooks'
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Icon, Input, Text} from '@ui-kitten/components'
import {clearWordsForTest, getWordsForTest} from '../../redux/Test/testReducer'
import {getIsWordsForTestLoading, getTestWords} from '../../redux/Test/testSelectors'
import {getRandomNumberInRange} from '../../functions'
import * as yup from 'yup'
import {accentColor, infoColor, wrapperPadding} from '../../constants'
import {useNavigation} from '@react-navigation/native'

type AnswerStatus = 'correct' | 'error' | null;
type Mode = 'rus' | 'eng' | null;
type Answer = { answer: string };
type TestStats = { correctAnswers: number, errorWords: Array<number> };


interface IFormInputs {
	answer: string
}

const schema = yup.object().shape({
	answer: yup.string().required(),
})

enum testStatuses {notStarted = 0, loading = 1, started = 2, completed = 3}

export const TestScreen: React.FC = ({}) => {
	const {control, handleSubmit, reset, formState: {errors}} = useForm<IFormInputs>({
		resolver: yupResolver(schema)
	})
	const wordsForTest = useSelector(getTestWords)
	const dispatch = useDispatch()

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [currentWord, setCurrentWord] = useState('')
	const [totalQuestions, setTotalQuestions] = useState(0)
	const [testStatus, setTestStatus] = useState<number>(testStatuses.notStarted)
	const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)
	const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(null)
	const [mode, setMode] = useState<Mode>(null)
	const [testStats, setTestStats] = useState<TestStats>({correctAnswers: 0, errorWords: []})
	const loading = useSelector(getIsWordsForTestLoading)
	const navigation = useNavigation()

	const {isAlertShowed, alertText, alertType, showAlert, closeAlert} = useAlert()


	useEffect(() => {
		return () => {
			dispatch(clearWordsForTest())
		}
	}, [])

	useEffect(() => {
		if (wordsForTest.length) {
			console.log('words here', wordsForTest)
			setTotalQuestions(wordsForTest.length)
			setCurrentQuestion(1)
			setTestStatus(testStatuses.started)

		}
	}, [wordsForTest])

	useEffect(() => {
		console.log(testStats)
	}, [testStats])

	useEffect(() => {

		if (currentQuestion) {
			console.log('CDCDSDC', currentQuestion)
			const mode = generateMode()
			generateWord(mode)
		}

	}, [currentQuestion])

	const startTest = async () => {
		await dispatch(getWordsForTest())
		setTestStatus(testStatuses.started)
	}

	const updateStats = (status: ('success' | 'error'), wordId?: number) => {
		let newStats = {...testStats}

		if (status === 'success') {
			newStats.correctAnswers = ++newStats.correctAnswers
		} else {
			newStats.errorWords.push(wordId!)
		}

		setTestStats(newStats)
	}

	const onAnswer = ({answer}: Answer) => {
		const currentWord = wordsForTest[currentQuestion - 1]
		const translates = currentWord.translate.split(',')

		if (mode === 'eng') {
			console.log('rus', translates)
			if (translates.includes(answer.toLowerCase())) {
				setAnswerStatus('correct')
				updateStats('success')
			} else {
				setAnswerStatus('error')
				updateStats('error', currentWord.id)
			}
		}

		if (mode === 'rus') {
			console.log('rus', answer, currentWord.word)
			if (wordsForTest[currentQuestion - 1].word === answer) {
				setAnswerStatus('correct')
				updateStats('success')
			} else {
				setAnswerStatus('error')
				updateStats('error', currentWord.id)
			}
		}

		setIsQuestionAnswered(true)
	}

	const generateMode = () => {
		const random = (Math.round(Math.random()))
		let mode: Mode
		if (random) {
			setMode('eng')
			mode = 'eng'
		} else {
			setMode('rus')
			mode = 'rus'
		}

		return mode
	}


	const generateWord = (mode: Mode) => {
		let resWord = ''
		const translates = wordsForTest[currentQuestion - 1].translate.split(',')
		const randomTranslate = getRandomNumberInRange(0, translates.length - 1)
		console.log(mode, translates, translates.length, randomTranslate)

		if (mode === 'rus') {
			resWord = translates[randomTranslate]
		}

		if (mode === 'eng') {
			resWord = wordsForTest[currentQuestion - 1].word
		}

		console.log('res word', resWord)

		setCurrentWord(resWord)

	}

	const nextQuestion = () => {
		setIsQuestionAnswered(false)
		reset()
		if (currentQuestion < totalQuestions) {
			setCurrentQuestion(prev => prev + 1)

		} else {
			setTestStatus(testStatuses.completed)
		}
	}

	const closeTest = () => {
		dispatch(clearWordsForTest())
		setTestStatus(testStatuses.notStarted)
	}

	return (
		<>
			{isAlertShowed &&
            <Alert text={alertText} type={alertType} onClose={closeAlert}/>}
			<View style={s.container}>
				{testStatus !== testStatuses.notStarted && <Button style={s.closeBtn}
                                                                   onPress={closeTest}
                                                                   appearance='ghost' status='danger'
                                                                   accessoryLeft={() => <Icon fill={infoColor}
																							  style={s.closeIcon}
																							  name='close-outline'/>}/>}
				{testStatus === testStatuses.notStarted && <Button onPress={startTest}>
                    Начать тренировку
                </Button>}
				{testStatus === testStatuses.started &&
                <View style={s.test}>
					{!isQuestionAnswered ?
							<View style={s.form}>
								<View style={s.progress}>
									<Text>{currentQuestion}/{totalQuestions}</Text></View>
								<Text>{currentWord}</Text>
								<Controller
									control={control}
									render={({field: {onChange, onBlur, value}}) => (
										<Input
											style={[s.input, errors.answer && s.inputError]}
											caption={errors.answer ? 'Введите слово' : ''}
											onBlur={onBlur}
											placeholder={'Перевод'}
											onChangeText={value => onChange(value)}
											value={value}
										/>
									)}
									name="answer"
									defaultValue=""
								/>
								<Button style={s.btn} onPress={handleSubmit(onAnswer)}>Ответить</Button>
							</View>
							:
							<View style={s.answerResult}>
								{answerStatus === 'correct' ?
									<View style={s.answerRes}>
										<Text style={[s.answerResTitle, s.correctAnswerResTitle]}>Правильно!</Text>
										<Button onPress={nextQuestion} style={s.addBTn}>Дальше</Button>
									</View> :
									<View style={s.answerRes}>
										<Text style={[s.answerResTitle, s.errorAnswerResTitle]}>Ошибка...</Text>
										<View style={s.errorContent}>
											<Text style={s.errorTitle}>{currentWord} переводится как:&nbsp;</Text>
											<Text style={s.errorVars}>
												{mode === 'eng' ? wordsForTest[currentQuestion - 1].translate : wordsForTest[currentQuestion - 1].word}
											</Text>
										</View>
										<Button onPress={nextQuestion} style={s.addBTn}>Дальше</Button>
									</View>}
							</View>}
                </View>}
			</View>
		</>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: accentColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: wrapperPadding,
		position: 'relative'
	},
	form: {
		width: '100%'
	},
	closeBtn: {
		position: 'absolute',
		top: 0,
		right: 0,


	},
	closeIcon: {
		width: 30, height: 30,
	}
})
