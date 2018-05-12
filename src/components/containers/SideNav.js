import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AuthActions, UserActions, ChatActions } from '../../actions'
import { withRouter, Link } from 'react-router-dom'
import { ContactList, ChatList } from '../layouts'

class SideNav extends Component {
	constructor(props){
		super(props)
		this.state = {
			activeContact:null
		}
	}

	componentDidMount(){
		const userId = this.props.auth.currentUser.uid
		if(this.props.user.chatsFetched === false){
			this.props.fetchChats(userId)
			this.props.fetchContactList(userId)
		}
		this.props.fetchActivatedChat(userId)
		.then(res => {
			this.props.activeContact(res.data.activeChat)
		})
	}

	logOut(e){
		e.preventDefault()
		this.props.logOut()
		.then(() => {
			this.props.history.push('/')
		})
	}

	openChat(contact, boolean, e){
		const userId = this.props.auth.currentUser.uid
		e.preventDefault()
		this.props.openChat(userId, contact, boolean)
		this.props.activeContact(contact)
	}

	activateChat(contact, e){
		const userId = this.props.auth.currentUser.uid
		e.preventDefault()
		console.log('SideNav: '+JSON.stringify(contact))
		this.props.activateChat(userId, contact)
		this.props.activeContact(contact)
	}

	deleteConversation(contact, boolean, e){
		const userId = this.props.auth.currentUser.uid
		e.preventDefault()
		this.props.openChat(userId, contact, boolean)
		.then(() => {
				
		})
	}

	render() {

		const contacts = this.props.user.contactList || null
		const chats = this.props.chat.chatList || null
		const active = this.props.chat.activeChat || null


		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-transparent">
				  <div className="collapse navbar-collapse" id="navbarSupportedContent">
				    <ul className="navbar-nav ml-auto">
				    	<li className="nav-item" >
				    	<span className="navbar-text" style={styles.links}>Hello {this.props.email} !</span>
				    	</li>
				      <li className="nav-item ">
				        <div className="dropdown">
				        	<button className="btn btn-link nav-link" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				        		<i className="fas fa-ellipsis-v" style={styles.links} ></i>
				        	</button>
				        	<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
								    <Link className="dropdown-item" to="/profile">Profile</Link>
								    <a className="dropdown-item" onClick={this.logOut.bind(this)}>Logout</a>
								    <Link className="dropdown-item"to="/users">Add Contact</Link>
								  </div>
				        </div>
				      </li>
						</ul>			   
				  </div>
				</nav>
				<hr style={styles.hr} />
				<ChatList 
					chats={chats}
					active={active}
					deleteConversation={(contact, boolean) => this.deleteConversation.bind(this, contact, boolean)}
					activateChat={(contact) => this.activateChat.bind(this, contact)}

				/>
				<ContactList 
					contacts={contacts}
					openChat={(contact, boolean) => this.openChat.bind(this, contact, boolean)}
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
		fetchContactList: (userId) => dispatch(UserActions.fetchContactList(userId)),
		fetchChats: (userId) => dispatch(ChatActions.fetchChats(userId)),
		openChat: (userId, contact, boolean) => dispatch(ChatActions.openChat(userId, contact, boolean)),
		activateChat: (userId, contact) => dispatch(ChatActions.activateChat(userId, contact)),
		fetchActivatedChat: (userId) => dispatch(ChatActions.fetchActivatedChat(userId))
	}
}

export default withRouter(connect(stateToProps, dispatchToProps)(SideNav))
