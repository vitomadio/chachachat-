import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Home, Login, Profile, Users} from './components/containers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './stores'
import {Provider} from 'react-redux'


const app = (		
		
		<Provider store={store.configure(null)}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={props => <Login {...props} /> } />
					<Route exact path="/home" render={props => <Home {...props} /> } />
					<Route exact path="/profile" render={props => <Profile {...props} /> } />
					<Route exact path="/users" render={props => <Users {...props} /> } />
				</Switch>
			</BrowserRouter>
		</Provider>
)

ReactDOM.render(app, document.getElementById('root'))