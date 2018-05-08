import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AuthActions, UserActions } from '../../actions'
import { FlashMessage, LoginLayout, SignupLayout } from '../layouts'


 class Login extends Component {
 	constructor(props){
 		super(props)
 		this.state = {
 			currentUser: null,
 			message:null,
 			signupForm:false,
 			credentials: {
	 			email: null, 
	 			password: null
 			},
 			loginColor: 'black',
 			signupColor: 'grey'
 		}
 	}

 	login(e){
 		e.preventDefault()

 		let credentials = this.state.credentials

		this.props.login(credentials)
		.then(data => {
			if(data.code){
				this.setState({message: data.message})
			}else{
				
				this.props.checkIfUserExists(data.data.email)
				.then(user => {
					if(user){
						console.log(JSON.stringify(user))
					}else{
						let body = {
							userId: data.data.uid,
							email: data.data.email
						}
						
						this.props.createUserDocument(body)
						.then(response => {
							if(response.success == true){
								// this.props.fetchUser(data.data.uid)
								this.props.history.push('/home')
							}
							this.setState({message: 'Something whent wrong!'})
						})
					}
				})
			}
		})
 	}

 	signUp(e){
 		e.preventDefault()
 		let credentials = this.state.credentials
		this.props.signUp(credentials)
		.then(data => {
			if(data.code){
				this.setState({message: data.message})
			}else{		
				this.props.history.push('/home')					
			}
		})
 	}

	render() {

		const styles = {
			links: {
				textDecoration: 'none',
				fontSize: 1.5+'em',
				color: 'grey'
			}
		}

		const message = this.state.message
		const credentials = Object.assign({}, this.state.credentials)
		const signupForm = this.state.signupForm
		

		return (
			<div className="container">
				<div className="row justify-content-center" style={{marginTop: 25+'vh'}}>
					<div className="col-md-6 ">
					{(message !== null) ? <FlashMessage message={message} class={"alert alert-success col-md-12"}/> : null}
						<div className="col-md-8 mx-auto text-center">
								<button 
									className="btn btn-link" 
									onClick={(e) => {
										this.setState({
											signupForm:false,
											loginColor: 'black',
											signupColor: 'grey'
										});
									}}
									style={{textDecoration:'none',fontSize:1.5+'em',color:this.state.loginColor}}
									>Login</button> <span style={styles.links}>/</span> 
								<button 
									className="btn btn-link" 
									onClick={(e) => this.setState({
										signupForm:true,
										loginColor: 'grey',
										signupColor: 'black'
									})}
									style={{textDecoration:'none',fontSize:1.5+'em',color:this.state.signupColor}}
									>Sign Up</button>
						
							{(signupForm == false) ?
								<LoginLayout 
								onChange={(attr, e) => {
									credentials[attr] = e.target.value
									this.setState({
										credentials: credentials 
									})
								}}
								login={this.login.bind(this)}
							/> : <SignupLayout 
								onChange={(attr, e) => {
									credentials[attr] = e.target.value
									this.setState({
										credentials: credentials 
									})
								}}
								signup={this.signUp.bind(this)}
								/> }
						</div>
					</div>
				</div>
			</div>
		);
	}

}


const stateToProps = (state) => {
	return {

	}
}

const dispatchToProps = (dispatch) => {
	return {
		login: (credentials) => dispatch(AuthActions.login(credentials)),
		signUp: (credentials) => dispatch(AuthActions.signUp(credentials)),
		createUserDocument: (body) => dispatch(UserActions.createUserDocument(body)),
		checkIfUserExists: (email) => dispatch(UserActions.checkIfUserExists(email))
		
	}
}

export default connect(stateToProps, dispatchToProps)(Login)
