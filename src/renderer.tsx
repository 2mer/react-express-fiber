import React from 'react';
import { Application } from 'express';
import reconciler from './reconciler';
import { ExpressContext } from './context/ExpressContext';
import createInstance from './reconciler/createInstance';
import { RequestContext } from './context/RequestContext';
import './react-express-fiber-types';

export function render(element: JSX.Element, root: Application) {
	const rootInstance = createInstance();

	root.use(rootInstance.root.handle);

	const rootContainer = reconciler.createContainer(
		rootInstance,
		1,
		null,
		false,
		null,
		'react-express-fiber',
		(err) => {
			console.log('got error!', err);
		},
		null
	);

	// Update fiber and expose three.js state to children
	reconciler.updateContainer(
		<ExpressContext.Provider value={{ app: root }}>
			<route
				h={(req, res, next) =>
					// @ts-ignore
					RequestContext.run({ req, res, next }, next)
				}
			>
				{element}
			</route>
		</ExpressContext.Provider>,
		rootContainer,
		null,
		() => undefined
	);
}
