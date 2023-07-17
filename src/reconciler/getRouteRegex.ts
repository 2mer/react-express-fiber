import { Router } from "express";
import { Layer } from "./Layer";

export default function getRouteRegex(path: string) {
	const vLayer = Router().use(path, () => { }).stack[0] as Layer;
	return { regexp: vLayer.regexp, keys: vLayer.keys };
}