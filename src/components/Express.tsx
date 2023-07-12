import React, { useEffect } from 'react';
import _express, { Application } from 'express';
import { PropsWithChildren, useRef } from 'react';
import ExpressContext from '../context/ExpressContext';
import TargetContext from '../context/TargetContext';

export type ExpressProps = PropsWithChildren<{
	port: number;
	onStart: (app: Application) => void;
}>;

export function Express({ port, onStart, children }: ExpressProps) {
	const app = _express();

	app.listen(port, () => onStart(app));

	return (
		<ExpressContext.Provider value={{ app: app }}>
			<TargetContext.Provider value={{ target: app }}>
				{children}
			</TargetContext.Provider>
		</ExpressContext.Provider>
	);
}
