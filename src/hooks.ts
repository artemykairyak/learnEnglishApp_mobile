import {useState} from 'react'
import {AlertType} from './types'

export const useAlert = () => {
	const [isAlertShowed, setIsAlertShowed] = useState(false)
	const [alertText, setAlertText] = useState('')
	const [alertType, setAlertType] = useState<AlertType>('success')

	const showAlert = (alertText: string, alertType: AlertType) => {
		setAlertText(alertText)
		setAlertType(alertType)
		setIsAlertShowed(true)
	}

	const closeAlert = () => {
		setIsAlertShowed(false)
	}

	return {isAlertShowed, alertText, alertType, showAlert, closeAlert}
}
