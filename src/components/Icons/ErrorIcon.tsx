import {Icon} from '@ui-kitten/components'
import {errorColor} from '../../constants'

import React from 'react'

export const ErrorIcon: React.FC = ({}) => {
	return (
		<Icon
			style={{width: 50, height: 50}}
			fill={errorColor}
			name='alert-triangle'
		/>
	)
}
