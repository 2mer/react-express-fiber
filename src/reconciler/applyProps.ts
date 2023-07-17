import asArray from "../util/asArray";
import { Instance } from "./Instance";
import getHandlers from "./getHandlers";
import getRoutePathProps from "./getRouteRegex";

export default function applyProps(instance: Instance, newProps: any, oldProps: any = {}) {
	// handle handlers
	const newHandlers = getHandlers(newProps)
	const oldHandlers = getHandlers(oldProps)
	const newPath = newProps.path;
	const oldPath = oldProps.path;

	const handlersChanged = newHandlers !== oldHandlers;
	const pathChanged = newPath !== oldPath;

	if (handlersChanged || pathChanged) {
		const { type = '' } = instance;

		instance.handlers.handle.stack = [];
		const method = type.startsWith('x-') ? type.replace('x-', '') : 'use'

		asArray(newHandlers).filter(Boolean).forEach(h => {
			(instance.handlers.handle as any)[method](newPath ?? '', h);
		})
	}

	if (pathChanged) {
		Object.assign(instance.children, getRoutePathProps(newPath));
	}
}