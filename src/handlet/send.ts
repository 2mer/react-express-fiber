import { NextFunction, Request, Response } from 'express';

export default function send<T>(
	h: T | ((req: Request, res: Response, next: NextFunction) => T)
) {
	return (req: any, res: any, next: NextFunction) => {
		if (typeof h === 'function') {
			// @ts-ignore
			return res.send(h(req, res, next));
		}
		return res.send(h);
	};
}