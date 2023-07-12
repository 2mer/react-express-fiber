import React from 'react';
import { PropsWithChildren } from 'react';
import { RequestHandler, Router, RouterOptions } from 'express';
import TargetContext, { useTarget } from '../context/TargetContext';

export type RouteProps = PropsWithChildren<
	{
		path?: string;
		handlers?: RequestHandler[];
		handler?: RequestHandler;
	} & Partial<RouterOptions>
>;

function asArray<T>(v: T | T[]) {
	if (Array.isArray(v)) return v;
	return [v];
}

export function Route({
	path = '',
	handler,
	handlers,
	children,
	...rest
}: RouteProps) {
	const target = useTarget();
	const router = Router({ mergeParams: true, ...rest });

	const h = handler || handlers || [];

	target.use(path, [...asArray(h), router]);

	return (
		<TargetContext.Provider value={{ target: router }}>
			{children}
		</TargetContext.Provider>
	);
}
