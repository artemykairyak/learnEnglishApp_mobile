import {Icon} from '@ui-kitten/components'
import {errorColor, successColor} from '../../constants'

import React from 'react'

export const SuccessIcon: React.FC = ({}) => {
	return (
		<Icon
			style={{width: 50, height: 50}}
			fill={successColor}
			name='checkmark-circle-2'
		/>
	)
}
