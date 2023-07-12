import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request, Response } from 'express';

export const RequestContext = new AsyncLocalStorage<{
	req: Request;
	res: Response;
	next: NextFunction;
}>();

export function useRequest() {
	return RequestContext.getStore()!;
}
