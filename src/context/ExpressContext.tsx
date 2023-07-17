import { Application } from 'express';
import { createContext, useContext } from 'react';

export const ExpressContext = createContext<{ app: Application }>({
	app: undefined as any,
});

export function useExpress() {
	return useContext(ExpressContext).app;
}
