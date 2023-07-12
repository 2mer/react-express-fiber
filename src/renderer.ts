import reconciler from './reconciler';

export const render = (element: any) => {
	// const root = reconciler.createContainer({}, 1, null, false, false, 'express-react', () => { }, null);
	const root = reconciler.createContainer({}, 1, null, false, null, 'express-react', (err) => {
		console.log('got error!', err);
	}, null);
	// Update fiber and expose three.js state to children
	reconciler.updateContainer(
		element,
		root,
		null,
		() => undefined
	);
};