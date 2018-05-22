import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AuthActions, UserActions, ChatActions } from '../../actions'
import { withRouter, Link } from 'react-router-dom'
import { ChatList } from '../layouts'

class SideNav extends Component {
	constructor(props){
		super(props)
		this.state = {
			activeChat: {}
		}
	}

	componentDidMount(){
		const user = this.props.auth.currentUser

		
		

		//Fetch Active Chat
		this.props.fetchActiveChat(user)
	}

	logOut(e){
		e.preventDefault()
		this.props.logOut()
		.then(() => {
			this.props.history.push('/')
		})
	}

	activateChat(contact, e){
		e.preventDefault()
		const user = this.props.auth.currentUser
		this.props.activateChat(user, contact)
		this.props.fetchChatList(user)

	}

	deleteConversation(contact, e){
		const user = this.props.auth.currentUser
		e.preventDefault()
		this.props.deleteConversation(user, contact)
		.then(() => {
				
		})
	}

	render() {

		const user = this.props.auth.currentUser
		// const contacts = this.props.user.contactList
		const chats = this.props.chat.chatList
		const activeChat = this.props.chat.activeChat

		return (
			<div>
				<nav className="navbar navbar-expand-md navbar-light bg-transparent">
				  <div className="collapse navbar-collapse" id="navbarSupportedContent">
				    <ul className="navbar-nav ml-auto">
				    	<li className="nav-item" >
				    	<span className="navbar-text mr-3" style={styles.links}>Hello {user.email} !</span>
				    	</li>
				    	<li className="nav-item">
								<button className="btn btn-link nav-link" onClick={this.props.openContacts.bind(this)}>
				        		<i class="far fa-comment-alt" style={styles.links} ></i>
				        	</button>
				    	</li>
				      <li className="nav-item ">
				        <div className="dropdown">
				        	<button className="btn btn-link nav-link" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				        		<i className="fas fa-ellipsis-v" style={styles.links} ></i>
				        	</button>
				        	<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
								    <Link className="dropdown-item" to="/profile">Profile</Link>
								    <a className="dropdown-item" onClick={this.logOut.bind(this)}>Logout</a>
								    <Link className="dropdown-item" to="/users">Add Contact</Link>
								  </div>
				        </div>
				      </li>
						</ul>			   
				  </div>
				</nav>
				<hr style={styles.hr} />
				<ChatList 
					chats={chats}
					active={activeChat}
					activateChat={(contact) => this.activateChat.bind(this, contact)}
					deleteConversation={(contact) => this.deleteConversation.bind(this, contact)}
				/>
				
			</div>

		);
	}
}

const styles = {
	links: {
		color: '#ddd',
	},
	hr:{
		borderColor: '#6a6a6a',
		margin:0
	}

}

const stateToProps = (state) => {
	return {
		auth: state.authReducer,
		user: state.userReducer,
		chat: state.chatReducer
	}
}

const dispatchToProps = (dispatch) => {
	return {
		logOut: () => dispatch(AuthActions.logOut()),
		activateChat: (user, contact) => {
			dispatch(ChatActions.activateChat(user, contact)),
			dispatch(ChatActions.setActiveChat(contact))
		},
		fetchActiveChat: (user) => dispatch(ChatActions.fetchActiveChat(user)),
		deleteConversation: (user, contact) => dispatch(ChatActions.deleteConversation(user, contact)),
		fetchChatList: (user) => dispatch(ChatActions.fetchChatList(user))
	}
}

export default withRouter(connect(stateToProps, dispatchToProps)(SideNav))
