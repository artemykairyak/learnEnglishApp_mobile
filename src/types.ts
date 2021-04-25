export type AlertType = 'success' | 'error'

export enum StatusCodes {
	success= 200,
	error = 400
}

export interface IWord { id: number, word: string, translate: string }
