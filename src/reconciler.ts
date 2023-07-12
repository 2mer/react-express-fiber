// @ts-nocheck
import Reconciler from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';

const reconciler = Reconciler({
	// three.js objects can be updated, so we inform the renderer
	supportsMutation: true,
	// We set this to false because this can work on top of react-dom
	isPrimaryRenderer: false,
	// We can modify the ref here, but we return it instead (no-op)
	getPublicInstance: instance => {
		// console.log(instance);
		// return instance
	},
	// This object that's passed into the reconciler is the host context.
	// We don't need to expose it though
	getRootHostContext: () => ({}),
	getChildHostContext: () => ({}),
	// Text isn't supported in three (r133), so we skip it
	createTextInstance: () => { },
	// This is used to calculate updates in the render phase or commitUpdate.
	// Although this improves performance, it's not needed for a PoC
	prepareUpdate: () => ({}),
	// This lets us store stuff before React mutates our three.js objects.
	// We don't do anything here but return an empty object
	prepareForCommit: () => ({}),
	resetAfterCommit: () => ({}),
	// three.js elements don't have textContent, so we skip this
	shouldSetTextContent: () => false,
	// We can mutate objects once they're assembled into the scene graph here.
	// applyProps removes the need for this though
	finalizeInitialChildren: () => false,
	// This can modify the container and clear children.
	// Might be useful for disposing on demand later
	clearContainer: () => false,
	// This is where we'll create a three.js element from a React element
	createInstance(type, props) {
		// console.log('got here?')
	},
	// These methods add elements to the scene
	appendChild(parentInstance, child) {
		// console.log('child')
		// parentInstance.add(child)
	},
	appendInitialChild(parentInstance, child) { parentInstance.add(child) },
	appendChildToContainer(parentInstance, child) { parentInstance.add(child) },
	// These methods remove elements from the scene
	removeChild(parentInstance, child) { parentInstance.remove(child); },
	removeChildFromContainer(parentInstance, child) { parentInstance.remove(child); },
	// We can specify an order for children to be specified here.
	// This is useful if you want to override stuff like materials
	insertBefore(parentInstance, child, beforeChild) {
		// if (!child) return;

		// child.parent = parentInstance;

		// const index = parentInstance.children.indexOf(beforeChild);
		// parentInstance.children = [
		// 	...parentInstance.children.slice(0, index),
		// 	child,
		// 	...parentInstance.children.slice(index),
		// ];

		// // Emit an event that tells three.js the element is added
		// child.dispatchEvent({ type: 'added' });
	},
	// This is where we mutate three.js objects in the render phase
	commitUpdate(instance, updatePayload, type, oldProps, newProps) {
	},
	getCurrentEventPriority() {

		return DefaultEventPriority;
	},
});

export default reconciler;
