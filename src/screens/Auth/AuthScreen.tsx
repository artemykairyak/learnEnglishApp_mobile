import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import {Button, Icon, Input} from '@ui-kitten/components'
import {Controller, useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorColor, font, fontBold, infoColor, successColor, white, wrapperPadding} from '../../constants'
import {login} from '../../redux/auth/authReducer'
import {useDispatch} from 'react-redux'

interface IFormInputs {
	username: string
	password: string
}

const schema = yup.object().shape({
	username: yup.string().required(),
	password: yup.string().required(),
});

export const AuthScreen = ({}) => {
	const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
		resolver: yupResolver(schema)
	});

	const dispatch = useDispatch()
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const showPasswordIcon = () => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon fill={infoColor} style={s.showPasswordIcon} name={secureTextEntry ? 'eye-off' : 'eye'}/>
		</TouchableWithoutFeedback>
	);

	const onSubmit = (data: IFormInputs) => {
		const {username, password} = data;
		dispatch(login(username, password))
	}

	useEffect(() => {
		console.log(errors)
	},[errors])

	return (
		<View style={s.container}>
			<Text style={s.title}>Войти</Text>
			<View style={s.form}>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							status={!!errors.username ? 'danger' : 'primary'}
							style={[s.input, errors.username && s.inputError]}
							caption={errors.username ? 'Введите имя пользователя' : ''}
							onBlur={onBlur}
							placeholder={'Имя пользователя'}
							onChangeText={value => onChange(value)}
							value={value}
						/>
					)}
					name="username"
					defaultValue=""
				/>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							accessoryRight={showPasswordIcon}
							style={[s.input, errors.password && s.inputError]}
							caption={errors.password ? 'Введите пароль' : ''}
							onBlur={onBlur}
							onChangeText={value => onChange(value)}
							value={value}
							placeholder={'Пароль'}
							secureTextEntry={secureTextEntry}
						/>
					)}
					name="password"
					defaultValue=""
				/>
				{/*{errors.username && <Text>Заполните обязательные поля</Text>}*/}
				<Button style={s.btn} onPress={handleSubmit(onSubmit)}>Войти</Button>
				{/*<Input*/}
				{/*	status={error ? 'danger' : 'success'}*/}
				{/*	placeholder={placeholder}*/}
				{/*	value={value}*/}
				{/*	textStyle={{...addTextStyles}}*/}
				{/*	style={[!disabled ? {backgroundColor: '#fff'} : {backgroundColor: bgColor}, {...addInputStyles}]}*/}
				{/*	accessoryRight={() => rightIcon}*/}
				{/*	accessoryLeft={leftIcon && (() => <Icon name={leftIcon.name}*/}
				{/*											fill={error ? red : gray}*/}
				{/*											style={leftIcon.style}/>)}*/}
				{/*	onChangeText={nextValue => {*/}
				{/*		setValue(nextValue);*/}
				{/*		onChange(nextValue);*/}
				{/*	}}*/}
				{/*/>*/}
			</View>
			<TouchableOpacity style={s.alternateBtnContainer}>
				<Text style={s.alternateBtn}>Зарегистрироваться</Text>
			</TouchableOpacity>
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: wrapperPadding
	},
	title: {
		// color: infoColor,
		fontFamily: font,
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
		borderColor: infoColor,
		marginBottom: 15
	},
	inputError: {
		borderColor: errorColor
	},
	btn: {
		backgroundColor: 'transparent',
		borderColor: infoColor,
	},
	alternateBtnContainer: {
		marginTop: 15
	},
	alternateBtn: {
		fontSize: 14
	}
})
