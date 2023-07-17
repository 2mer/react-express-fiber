import Reconciler from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import createInstance from './reconciler/createInstance';
import { Instance } from './reconciler/Instance';
import applyProps from './reconciler/applyProps';

function appendChild(parentInstance: Instance, child: Instance) {
	if (!child) return;

	parentInstance.children.handle.stack.push(child.root);
}

function removeChild(parentInstance: Instance, child: Instance) {
	if (!child) return;

	const index = parentInstance.children.handle.stack.indexOf(child.root);

	if (index > -1) {
		parentInstance.children.handle.stack.splice(index, 1);
	}
}


const reconciler = Reconciler({
	// express objects can be updated, so we inform the renderer
	supportsMutation: true,
	// we are the primary renderer, we render express objects!
	isPrimaryRenderer: true,
	// We can modify the ref here, but we return it instead (no-op)
	getPublicInstance: instance => instance,
	// This object that's passed into the reconciler is the host context.
	// We don't need to expose it though
	getRootHostContext: () => ({}),
	getChildHostContext: () => ({}),
	// Text isn't supported in three (r133), so we skip it
	createTextInstance: () => { },
	// This is used to calculate updates in the render phase or commitUpdate.
	// Although this improves performance, it's not needed for a PoC
	prepareUpdate: () => ({}),
	// This lets us store stuff before React mutates our express objects.
	// We don't do anything here but return an empty object
	prepareForCommit: () => ({}),
	resetAfterCommit: () => ({}),
	// express elements don't have textContent, so we skip this
	shouldSetTextContent: () => false,
	// We can mutate objects once they're assembled into the scene graph here.
	// applyProps removes the need for this though
	finalizeInitialChildren: () => false,
	// This can modify the container and clear children.
	// Might be useful for disposing on demand later
	clearContainer: () => false,




	// This is where we'll create a express element from a React element
	createInstance,


	// These methods add elements to the scene
	appendChild,
	appendInitialChild: appendChild,
	appendChildToContainer: appendChild,

	// These methods remove elements from the scene
	removeChild,
	removeChildFromContainer: removeChild,

	// We can specify an order for children to be specified here.
	// This is useful if you want to override stuff like materials
	insertBefore(parentInstance, child, beforeChild) {
		if (!child || !beforeChild) return;

		const index = parentInstance.children.handle.stack.indexOf(beforeChild.root);

		if (index > -1) {
			parentInstance.children.handle.stack.splice(index, 0, child.root);
		}
	},



	// This is where we mutate express objects in the render phase
	commitUpdate(instance, updatePayload, type, oldProps, newProps) {
		applyProps(instance, newProps, oldProps);
	},



	getCurrentEventPriority() {
		return DefaultEventPriority;
	},






	supportsPersistence: false,
	preparePortalMount: function (containerInfo: any): void {
		throw new Error('Function not implemented.');
	},
	scheduleTimeout: function (fn: (...args: unknown[]) => unknown, delay?: number | undefined): unknown {
		throw new Error('Function not implemented.');
	},
	cancelTimeout: function (id: unknown): void {
		throw new Error('Function not implemented.');
	},
	noTimeout: undefined,
	getInstanceFromNode: function (node: any): Reconciler.Fiber | null | undefined {
		throw new Error('Function not implemented.');
	},
	beforeActiveInstanceBlur: function (): void {
		throw new Error('Function not implemented.');
	},
	afterActiveInstanceBlur: function (): void {
		throw new Error('Function not implemented.');
	},
	prepareScopeUpdate: function (scopeInstance: any, instance: any): void {
		throw new Error('Function not implemented.');
	},
	getInstanceFromScope: function (scopeInstance: any) {
		throw new Error('Function not implemented.');
	},
	detachDeletedInstance: function (node: any): void {

	},
	supportsHydration: false,


});


export default reconciler;
