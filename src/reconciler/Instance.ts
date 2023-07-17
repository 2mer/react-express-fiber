import { Layer } from "./Layer";

export interface Instance {
	root: Layer,
	handlers: Layer,
	children: Layer,
	type?: string,
}

/*

// a layer in order for it to be an atomic instance that can be inserted into the stack at the index we desire
// like a fragment, no logic here, just used for grouping
Layer#root {
	handle: {
		stack: [
			// mount handlers here (affected by path)
			Layer#handlers {
				handle: {
					stack: $handlers
				}
			},

			// mount children here in the specified path
			Layer#children {
				regexp: pathToRegex($path)
				handle: {
					stack: [
						// children are directly mounted here as layers (#root)
					]
				}
			},
		]
	}
}


*/