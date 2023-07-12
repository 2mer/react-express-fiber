import { createContext, useContext } from 'react';

const RouteContext = createContext<{ route: string }>({
	route: undefined as any,
});

export function useRoute() {
	return useContext(RouteContext).route;
}

export default RouteContext;
