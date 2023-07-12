import React from 'react';
import { render } from './renderer';
import { DELETE, Express, GET, POST, PUT, Route } from './components';
import { useRequest } from './context/RequestContext';

render(
	<Express
		port={3000}
		onStart={(app) => {
			console.log('App is listening on port 3000');
			app.get('/test/:id', (req, res) => {
				res.status(200).send('egg' + req.params.id);
			});
		}}
	>
		<Route path='*.ts'>
			<GET onRequest={(req) => req.baseUrl} />
		</Route>
		<Route path='/users'>
			<GET onRequest={() => 'hello get'} />
			<POST onRequest={() => 'hello post'} />
			<PUT onRequest={() => 'hello put'} />
			<DELETE onRequest={() => 'hello delete'} />

			<Route path='/:id'>
				<GET
					onRequest={() => {
						const { req } = useRequest();
						console.log(req.params);
						console.log(req.baseUrl);

						return `hello id: ${req.params.id}`;
					}}
				/>
			</Route>
		</Route>
	</Express>
);
