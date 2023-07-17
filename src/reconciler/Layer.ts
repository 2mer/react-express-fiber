import { RequestHandler, Router } from "express";

export type Layer = { handle: Router, keys: any[], regexp: any, route: any }
export default function createLayer(handler: RequestHandler) {
	return (Router() as any).use('', handler).stack[0] as Layer;
}