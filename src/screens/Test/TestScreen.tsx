import React, {useEffect, useRef, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Alert} from '../../components/Alert'
import {useAlert, useProgressBar} from '../../hooks'
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Icon, Input, Text} from '@ui-kitten/components'
import {clearWordsForTest, getWordsForTest} from '../../redux/Test/testReducer'
import {getTestWords} from '../../redux/Test/testSelectors'
import {getRandomNumberInRange} from '../../functions'
import * as yup from 'yup'
import {bgColor, fontMedium, infoColor, textColor, wrapperPadding} from '../../constants'
import {ProgressBar} from '../../components/ProgressBar'
import {TestResult} from './components/TestResult'
import {AnswerStatus, Mode, TestStats} from './types'
import {AnswerResult} from './components/AnswerResult'
import {Loader} from '../../components/Loader'
import {getIsLoading} from '../../redux/App/appSelectors'

type Answer = { answer: string };

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
	const loading = useSelector(getIsLoading)

	const dispatch = useDispatch()
	const answerInputRef = useRef<Input | null>(null)

	useEffect(() => {
		if (answerInputRef.current) {
			answerInputRef.current.focus()
		}
	}, [answerInputRef.current])

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [currentWord, setCurrentWord] = useState('')
	const [totalQuestions, setTotalQuestions] = useState(0)
	const [testStatus, setTestStatus] = useState<testStatuses>(testStatuses.notStarted)
	const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)
	const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(null)
	const [mode, setMode] = useState<Mode>(null)
	const [testStats, setTestStats] = useState<TestStats>({correctAnswers: 0, errorWords: []})

	const {isAlertShowed, alertText, alertType, showAlert, closeAlert} = useAlert()
	const [itemsMap, updateItemsMap] = useProgressBar(totalQuestions)


	useEffect(() => {
		return () => {
			dispatch(clearWordsForTest())
		}
	}, [])

	useEffect(() => {
		if (wordsForTest.length) {
			setTotalQuestions(wordsForTest.length)
			setCurrentQuestion(1)
			setTestStatus(testStatuses.started)

		}
	}, [wordsForTest])

	useEffect(() => {
		if (currentQuestion) {
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
			updateItemsMap(true, currentQuestion)
		} else {
			newStats.errorWords.push(wordId!)
			updateItemsMap(false, currentQuestion)
		}

		setTestStats(newStats)
	}

	const onAnswer = ({answer}: Answer) => {
		const currentWord = wordsForTest[currentQuestion - 1]
		const translates = currentWord.translate.split(',')

		if (mode === 'eng') {
			const finded = translates.find(item => item.toLowerCase() === answer.toLowerCase())

			if (finded) {
				setAnswerStatus('correct')
				updateStats('success')
			} else {
				setAnswerStatus('error')
				updateStats('error', currentWord.id)
			}
		}

		if (mode === 'rus') {
			if (wordsForTest[currentQuestion - 1].word.toLowerCase() === answer.toLowerCase()) {
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

		if (mode === 'rus') {
			resWord = translates[randomTranslate]
		}

		if (mode === 'eng') {
			resWord = wordsForTest[currentQuestion - 1].word
		}

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
		setCurrentQuestion(0)
		setCurrentWord('')
		setTotalQuestions(0)
		setAnswerStatus(null)
		setIsQuestionAnswered(false)
		reset()
	}

	return (
		<>
			{loading && <Loader/>}
			{isAlertShowed &&
            <Alert text={alertText} type={alertType} onClose={closeAlert}/>}
			<View style={[s.container]}>
				{testStatus !== testStatuses.completed &&
                <ProgressBar totalItems={totalQuestions} itemsMap={itemsMap}/>}
				{testStatus === testStatuses.started && <Button style={s.closeBtn}
                                                                onPress={closeTest}
                                                                appearance='ghost'
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
							<Text style={s.currentWord}>{currentWord.toLowerCase()}</Text>
							<Controller
								control={control}
								render={({field: {onChange, value}}) => (
									<Input
										status={errors.answer && 'danger'}
										style={[s.input]}
										caption={errors.answer ? 'Введите слово' : ''}
										placeholder={'Перевод'}
										onChangeText={value => onChange(value)}
										value={value}
										ref={ref => answerInputRef.current = ref}
									/>
								)}
								name="answer"
								defaultValue=""
							/>
							<Button onPress={handleSubmit(onAnswer)}>Ответить</Button>
						</View>
						:
						<View style={s.answerResult}>
							<AnswerResult answerStatus={answerStatus}
										  wordsForTest={wordsForTest}
										  currentQuestion={currentQuestion}
										  currentWord={currentWord}
										  mode={mode}
										  nextQuestion={nextQuestion}/>
						</View>}
                </View>}
				{testStatus === testStatuses.completed &&
                <TestResult totalQuestions={totalQuestions} testStats={testStats} closeTest={closeTest}/>}
			</View>
		</>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: bgColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: wrapperPadding,
		position: 'relative',
	},
	form: {
		width: '100%',
		flex: 1,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center'
	},
	closeBtn: {
		position: 'absolute',
		top: 7,
		right: 0,
	},
	closeIcon: {
		width: 30, height: 30,
	},
	test: {
		position: 'relative',
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7,
	},
	progress: {
		position: 'absolute',
		right: 30,
		top: 15,
		fontSize: 18,
		fontWeight: '500',
	},
	progressText: {
		color: textColor
	},
	currentWord: {
		fontSize: 20,
		fontFamily: fontMedium
	},
	inputWrapper: {
		flex: 0,
		alignItems: 'flex-start',
		marginVertical: 30
	},
	input: {
		width: '100%',
		marginVertical: 15,
		height: 55
	},
	btnWrapper: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	testBtnWrapper: {
		zIndex: 40
	},
	testBtn: {
		height: 80,
		width: 80
	},
	answerResult: {},
	results: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	stats: {fontSize: 32, fontWeight: '500', marginVertical: 30},
})
