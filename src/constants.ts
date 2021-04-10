import {Dimensions} from 'react-native'

export const {height, width} = Dimensions.get('window');

//URLs

export const BASE_URL = 'http://192.168.1.64:5000'
export const TOKEN_NAME = 'LEARN_ENGLISH_TOKEN'

// colors

export const white = '#ffffff'
export const accentColor = '#F6DA73'
export const successColor = '#7FD83A'
export const infoColor = '#3e5336'
export const warningColor = '#FFC642'
export const errorColor = '#e55b7e'

//fonts

export const font = 'SFUIDisplay-Regular';
export const fontMedium = 'SFUIDisplay-Medium';
export const fontBold = 'SFUIDisplay-Bold';

//sizes

export const wrapperPadding = width / 10;
