import { useEffect } from "react";
import { useTarget } from "../context/TargetContext";
import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { RequestContext } from "../context/RequestContext";

export type MethodProps = { path?: string, onRequest: RequestHandler }

function createMethodComponent(method: keyof Router) {
	return ({ path = '', onRequest }: MethodProps) => {
		const target = useTarget();

		useEffect(() => {
			(target[method] as any)(path, (req: Request, res: Response, next: NextFunction) => {
				RequestContext.run({ req, res, next }, async () => {
					try {
						const data = await onRequest(req, res, next)

						if (!res.headersSent) {
							res.status(200).send(data)
						}
					} catch (err) {
						next(err);
					}
				})
			});
		}, [])

		return null;
	}
}

export const GET = createMethodComponent('get');
export const PUT = createMethodComponent('put');
export const POST = createMethodComponent('post');
export const DELETE = createMethodComponent('delete');

