import React, { Component } from 'react';

 class Login extends Component {
 	constructor(props){
 		super(props)
 		this.state = {
 			currentUser: null,
 			email: null, 
 			password: null,
 		}
 	}

	render() {

		return (
			<div className="container">
				<div className="row justify-content-center" style={{marginTop: 25+'vh'}} >
					<div className="col-md-4">
						<h2 className="text-center">Login</h2>
						<form>
							<div className="form-group">
								<label className="sr-only" for="email">Email:</label>
								<input
									className="form-control" 
									type="email"
									placeholder="Email"
									onChange={(e) => this.setState({email:e.target.value})}
									/>
							</div>
							<div className="form-group">
								<label className="sr-only" for="password">Email:</label>
								<input 
									className="form-control"
									type="password"
									placeholder="Password"
									onChange={(e) => this.setState({password:e.target.value})}
									/>
							</div>
							<button className="btn btn-primary">Login</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Login
