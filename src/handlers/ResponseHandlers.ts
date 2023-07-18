import { Response } from 'express';

export const SuccessResponse = (res: Response, data:any) => {
	return res.status(200).json({
		message: 'SUCCESS',
		data,
	});
};
export const ErrorServerResponse = (res: Response) => {
	return res.status(500).json({
		message: 'ERROR SERVER',
	});
};

export const CustomResponse = (res: Response, status: number, message: string, data: any) => {
	return res.status(status).json({
		message,
		data,
	});
};


