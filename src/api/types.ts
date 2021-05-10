import {IWord} from '../types'

export interface IResponse {
	statusCode: number,
	message?: string
}

export interface IResponseWithWords extends IResponse{
	words: Array<IWord>
}

export interface IResponseWithToken extends IResponse{
	token: string
}


