import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Home, Login} from './components/containers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const app = (		
		
		<BrowserRouter>
			<Switch>
				<Route exact path="/" render={props => <Login {...props} /> } />
				<Route exact path="/home" render={props => <Home {...props} /> } />
			</Switch>
		</BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))