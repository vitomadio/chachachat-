import React, { Component } from 'react'
import { MessageForm, MessagesDisplay } from '../layouts'
import SideNav from './SideNav.js'
import { connect } from 'react-redux'
import { UserActions } from '../../actions'

class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			message: null,
			newMessage: null,
			currentUser: null,
			email: null
		}
	}

	componentDidMount(){
		const userId = this.props.auth.currentUser
		this.props.fetchUser(userId)
		.then((data) => {
			this.setState({
				email: this.props.user.email
			})
		})
	}

	submitMessage(){
		
	}

	render() {
		const state = this.state
		
		return (
			<div className="container-fluid" style={styles.container}>
				<div className="row no-gutter" style={styles.row}>
					<div className="col-md-5 col-lg-4 col-xl-3" style={styles.sideBar}>
						<SideNav 
							email={state.email}
						/>
					</div>
					<div className="col-md-7 col-lg-8 col-xl-9" style={styles.messagesPanel}>
						<MessagesDisplay
							newMessage={state.newMessage}
							/>
						<MessageForm 
						 updateMessage={(e) => this.setState({message:e.target.value})}
						 submitMessage={(e) => (e.key === 'Enter') ? this.submitMessage() : null}	
						 />
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	container: {
		height: 100+'vh',
		backgroundColor: '#808080',
		padding: 0,
		overflow: 'hidden'
	},
	row:{
		padding: 0
	},
	sideBar:{
		backgroundColor: '#191919',
		height: 100+'vh',
		padding: 0
	},
	messagesPanel: {
		backgroundColor: '#ccc',
		height: 100+'vh'
	}
}

const stateToProps = (state) => {
	return {
		auth: state.authReducer,
		user: state.userReducer
	}
}

const dispatchToPorps = (dispatch) => {
	return {
		fetchUser: (userId) => dispatch(UserActions.fetchUser(userId))
	}
}

export default connect(stateToProps, dispatchToPorps)(Home)
