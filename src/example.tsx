import React, { useState } from 'react';
import express from 'express';

import { render } from './renderer';
import settings from './settings';

import send from './handlet/send';

settings.mergeParams = true;

const app = express();

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

render(<ExpressApp />, app);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`react-express-fiber is running on port ${PORT}`);
});
