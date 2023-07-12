import { Application } from 'express';
import { createContext, useContext } from 'react';

const ExpressContext = createContext<{ app: Application }>({
	app: undefined as any,
});

export function useExpress() {
	return useContext(ExpressContext).app;
}

export default ExpressContext;
