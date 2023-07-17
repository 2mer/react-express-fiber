# react-express-fiber

Using react write JSX to decleratively (and dynamically 😲) construct an express application

> ⚠ Note: this is a working proof of concept, while structurally it makes sense to look at express applications in a ree-like structure, and declaring it in JSX seems really convenient, there is more power in using something like tRPC (or my library [eproxe](https://github.com/2mer/eproxe)) to reduce client sided boiler plate, we can still levarage superpowers we are familiar with from react tho! see [kontext/express](https://github.com/2mer/kontext/tree/main/packages/express)

I will not continue development on this as i got it to a working state, and I dont see a valid reason to use this, it was fun writing this and learning about the react-reconciler tho

Current issues which might be related to the design which annoy me:

-   No simple way to maintain context syntax inside requests using kontext, kontext imitates React hooks' look and feel, but will cause confusion in this scenario, as they will either encourage users to break rules of hooks (because they do not need to follow it) or be used while not inside a request and vice versa (there are now two different context types, one for React while constructing elements, and one for Node while passing requests through the handler stack)

## Example

```jsx
import React, { useState } from 'react';
import express from 'express';

import { render, settings } from 'react-express-fiber';

import send from './handlet/send';

settings.mergeParams = true;

const ExpressApp = () => {
	const [enabled, setEnabled] = useState(false);

	return (
		<route>
			<route path='*.ts'>
				<x-get handler={send((req) => req.baseUrl)} />
			</route>
			<route path='/users'>
				<x-get handler={send('hello get')} />
				<x-post handler={send('hello post')} />
				<x-put handler={send('hello put')} />
				<x-delete handler={send('hello delete')} />

				<x-get
					path='/enable'
					handler={send(() => {
						setEnabled(true);
						return 'enabled!😎';
					})}
				/>
				<x-get
					path='/disable'
					handler={send(() => {
						setEnabled(false);
						return 'disabled!🤐';
					})}
				/>

				{enabled && (
					<route path='/:uuid'>
						<x-get h={send('Not trapped!!🍹')} />

						<route path='/:id'>
							<x-get
								h={send((req) => {
									console.log(req.params);
									console.log(req.baseUrl);

									return `hello id: ${req.params.uuid}/${req.params.id}`;
								})}
							/>
						</route>
					</route>
				)}

				<x-get path='/*' h={send('Its a trap!')} />
			</route>
		</route>
	);
};

const app = express();

render(<ExpressApp />, app);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`react-express-fiber is running on port ${PORT}`);
});
```
