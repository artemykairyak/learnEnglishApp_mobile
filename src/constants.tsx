import {Dimensions} from 'react-native'
import {Icon} from '@ui-kitten/components'

export const {height, width} = Dimensions.get('window')

//URLs

export const BASE_URL = 'http://192.168.1.64:5000'
export const TOKEN_NAME = 'LEARN_ENGLISH_TOKEN'

// colors

export const white = '#ffffff'
export const textColor = '#F2F6FF'
export const accentColor = '#F6DA73'
export const successColor = '#51F0B0'
export const infoColor = '#F2F8FF'
export const warningColor = '#FFC94D'
export const errorColor = '#FF708D'
export const bgColor = '#222B45'
export const bgColorDark = '#101426'

//fonts

export const font = 'SFUIDisplay-Regular'
export const fontMedium = 'SFUIDisplay-Medium'
export const fontBold = 'SFUIDisplay-Bold'

//sizes

export const wrapperPadding = width / 10
