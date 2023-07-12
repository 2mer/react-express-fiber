import { Router } from 'express';
import { createContext, useContext } from 'react';

const TargetContext = createContext<{ target: Router }>({
	target: undefined as any,
});

export function useTarget() {
	return useContext(TargetContext).target;
}

export default TargetContext;
