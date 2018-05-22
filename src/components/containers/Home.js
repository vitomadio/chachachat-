import React, { Component } from 'react'
import { MessageForm, MessagesDisplay } from '../layouts'
import SideNav from './SideNav.js'
import { ContactList } from '../layouts'
import { connect } from 'react-redux'
import { UserActions, ChatActions, MessageActions } from '../../actions'

class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			message: null,
			newMessage: null,
			currentUser: null,
			contactsClass: "contacts close"
		}
		
	}

	componentDidMount(){
		const user = this.props.auth.currentUser
		
		//Fetch Contact list	
		if(this.props.user.contactsFetched == false){
			this.props.fetchContactList(user)
		}
	
		//Fetch chats list
		if(this.props.chat.chatListFetched == false){
			this.props.fetchChatList(user)
		}

		//Fetch active contact messages
		if(this.props.msg.messagesLoaded == false){
			this.props.fetchMessages(user)			
		}
		
	}

	componentDidUpdate(){
		this.scrollToBottom()
	}

	activateContact(contact, e){
		e.preventDefault()
		const chatList = this.props.chat.chatList
		const result = chatList.find(chat => chat.uid == contact.uid)
		if(!result){
			this.props.activateContact(contact)
		}
		
		this.setState({contactsClass: "contacts close"})
	}

	deleteConversation(chat, e){

	}

	submitMessage(){
		const contact = this.props.chat.activeChat
		const user = this.props.auth.currentUser
		const message = this.state.message
		this.props.sendMessage(user, contact, message)
	
	}

	// setRef(e){
	//  this.childElement = e.target
	// }

	scrollToBottom(){
		this.childElement.scrollIntoView({block: "end"})
		
	}


	render() {
		const messages = this.props.msg.messagesList
		const user = this.props.auth.currentUser
		const contacts = this.props.user.contactList

		return (
		

				<div className="container-fluid" style={styles.container}>
					<div className="row no-gutter" style={styles.row}>
						<div className="col-md-5 col-lg-4 col-xl-3" style={styles.sideBar}>

								<div className={this.state.contactsClass}>
									<ul className="nav flex-column">
									  <ContactList 
											contacts={contacts}
											activateContact={(contact) => this.activateContact.bind(this, contact)}
											close={e => this.setState({contactsClass: "contacts close"})}
										/>	
									</ul>
								</div>

							<SideNav 
								openContacts={(e) => {
									
									this.setState({contactsClass: "contacts show"})
								}}
							/>
						</div>
						<div className="col-md-7 col-lg-8 col-xl-9" style={styles.messagesPanel}>
							<MessagesDisplay
							messages={messages}
							user={user}
							setRef={el => this.childElement = el}
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
		height: 100+'vh',
		paddingRight: 0
	}
}

const stateToProps = (state) => {
	return {
		auth: state.authReducer,
		user: state.userReducer,
		msg: state.msgReducer,
		chat: state.chatReducer
	}
}

const dispatchToPorps = (dispatch) => {
	return {
		fetchUser: (userId) => dispatch(UserActions.fetchUser(userId)),
		fetchContactList: (user) => dispatch(UserActions.fetchContactList(user)),
		fetchChatList: (user) => dispatch(ChatActions.fetchChatList(user)),
		sendMessage: (user, contact, message) => {
			dispatch(MessageActions.submitMessage(user, contact, message)),
			dispatch(UserActions.contactStateUpdate(user, contact, message)),
			dispatch(UserActions.unknownContactChat(user, contact)),
			dispatch(MessageActions.addMessageToMessagesList(user, contact, message))
		},
		activateContact: (contact) => dispatch(UserActions.activateContact(contact)),
		fetchMessages: (user) => dispatch(MessageActions.fetchMessages(user))
	}
}

export default connect(stateToProps, dispatchToPorps)(Home)
