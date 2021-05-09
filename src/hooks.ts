import {useEffect, useState} from 'react'
import {AlertType} from './types'
import {useDispatch, useSelector} from 'react-redux'
import {getIsLoading} from './redux/App/appSelectors'
import {appActions} from './redux/App/appReducer'

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

export const useProgressBar = (totalItems: number): [itemsMap, updateItemsMap] => {
	const [itemsMap, setItemsMap] = useState<Array<boolean>>([])

	useEffect(() => {
		setItemsMap(new Array(totalItems).fill(null))
	},[totalItems])

	const updateItemsMap = (value: boolean, position: number) => {
		const newMap = [...itemsMap]
		newMap[position - 1] = value
		setItemsMap(newMap)
	}

	return [itemsMap, updateItemsMap]
}

export const useLoading = (): [boolean, (isLoading: boolean) => void] => {
	const dispatch = useDispatch()
	const loading = useSelector(getIsLoading)

	const setLoading = (isLoading: boolean) => {
		dispatch(appActions.setLoading(isLoading))
	}

	return [loading, setLoading]
}

type itemsMap = Array<boolean>
type updateItemsMap = (value: boolean, position: number) => void
