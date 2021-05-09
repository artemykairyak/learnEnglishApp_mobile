import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Controller, useForm} from 'react-hook-form'
import {Button, Input} from '@ui-kitten/components'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch} from 'react-redux'
import WordsAPI from '../../api/WordsAPI'
import {bgColor, errorColor, wrapperPadding} from '../../constants'
import {Alert} from '../../components/Alert'
import {StatusCodes} from '../../types'
import {useAlert} from '../../hooks'
import {appActions} from '../../redux/App/appReducer'

interface IFormInputs {
	word: string
	translate: string
}

const schema = yup.object().shape({
	word: yup.string().required(),
	translate: yup.string().required(),
})

export const AddWordScreen: React.FC = ({}) => {
	const {control, handleSubmit, reset, formState: {errors}} = useForm<IFormInputs>({
		resolver: yupResolver(schema)
	})

	const {isAlertShowed, alertText, alertType, showAlert, closeAlert} = useAlert()
	const dispatch = useDispatch()

	const addWord = async (data: IFormInputs) => {
		dispatch(appActions.setLoading(true))

		const {word, translate} = data
		const res = await WordsAPI.addWord(word, translate)

		if (res.statusCode === StatusCodes.success) {
			showAlert(res.message, 'success')
			reset()
		} else {
			showAlert(res.message, 'error')
		}
		dispatch(appActions.setLoading(false))
	}

	return (
		<>
			{isAlertShowed &&
            <Alert text={alertText} type={alertType} onClose={closeAlert}/>}
			<View style={[s.container]}>
				<Text style={s.title}>Добавить слово</Text>
				<View style={s.form}>
					<Controller
						control={control}
						render={({field: {onChange, onBlur, value}}) => (
							<Input
								style={[s.input, errors.word && s.inputError]}
								caption={errors.word ? 'Введите слово' : ''}
								onBlur={onBlur}
								placeholder={'Слово на английском'}
								onChangeText={value => onChange(value)}
								value={value}
							/>
						)}
						name="word"
						defaultValue=""
					/>
					<Controller
						control={control}
						render={({field: {onChange, value}}) => (
							<Input
								style={[s.input, errors.translate && s.inputError]}
								caption={errors.translate ? 'Введите хотя бы один перевод' : ''}
								onChangeText={value => onChange(value)}
								value={value}
								placeholder={'Переводы (через запятую)'}
							/>
						)}
						name="translate"
						defaultValue=""
					/>
					<Button style={s.btn} onPress={handleSubmit(addWord)}>Добавить</Button>
				</View>
			</View>
		</>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: wrapperPadding,
		backgroundColor: bgColor
	},
	title: {
		fontSize: 24,
		marginBottom: 30
	},
	form: {
		width: '100%'
	},
	showPasswordIcon: {
		width: 15,
		height: 15,
	},
	input: {
		marginBottom: 15
	},
	inputError: {
		borderColor: errorColor
	},
	btn: {},
	error: {
		marginTop: 15,
		lineHeight: 20,
		color: errorColor
	}
})
