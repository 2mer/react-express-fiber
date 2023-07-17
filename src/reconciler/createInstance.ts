import { Router } from "express";
import createLayer from "./Layer";
import applyProps from "./applyProps";
import { Instance } from "./Instance";
import settings from "../settings";

export default function createInstance(type?: string, props: any = {}) {
	const { path: _, h: _0, handler: _1, handlers: _2, ref: _3, ...rest } = props;

	const withMerge = { ...rest, mergeParams: true }

	const root = createLayer(Router({ mergeParams: settings.mergeParams, ...rest }));
	const children = createLayer(Router(withMerge));
	const handlers = createLayer(Router(withMerge));

	root.handle.stack = [
		handlers,
		children
	]

	const instance: Instance = {
		type,
		root,
		handlers,
		children,
	};

	applyProps(instance, props)

	return instance;
}