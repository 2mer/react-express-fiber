import React from 'react';
import { PropsWithChildren } from 'react';
import { RequestHandler, Router } from 'express';
import TargetContext, { useTarget } from '../context/TargetContext';

export type RouteProps = PropsWithChildren<{
	path?: string;
	handlers?: RequestHandler[];
	handler?: RequestHandler;
}>;

function asArray<T>(v: T | T[]) {
	if (Array.isArray(v)) return v;
	return [v];
}

export function Route({ path = '', handler, handlers, ...rest }: RouteProps) {
	const target = useTarget();
	const router = Router({ mergeParams: true });

	const h = handler || handlers || [];

	target.use(path, [...asArray(h), router]);

	return <TargetContext.Provider value={{ target: router }} {...rest} />;
}
