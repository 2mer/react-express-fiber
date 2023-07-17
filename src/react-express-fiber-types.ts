import { RequestHandler, RouterOptions } from "express";
import { PropsWithChildren } from "react";

type HandlerError =
	"use only one of the props - 'handler', 'handlers', 'h' - on a react-express-fiber element";

type RouteProps = RouterOptions & {
	path?: string;
} & (
		| {
			h: RequestHandler | RequestHandler[];
			handler?: HandlerError;
			handlers?: HandlerError;
		}
		| { h?: HandlerError; handler: RequestHandler; handlers?: HandlerError }
		| {
			h?: HandlerError;
			handler?: HandlerError;
			handlers: RequestHandler[];
		} | { h?: undefined, handler?: undefined, handlers?: undefined }
	)

interface ReactExpressFiberElements {
	route: PropsWithChildren<RouteProps>;
	'x-get': RouteProps;
	'x-delete': RouteProps;
	'x-put': RouteProps;
	'x-post': RouteProps;
	'x-all': RouteProps;
}

declare global {
	namespace JSX {
		interface IntrinsicElements extends ReactExpressFiberElements { }
	}
}
