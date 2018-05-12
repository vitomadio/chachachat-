import constant from '../constants'

const db = firebase.firestore().collection('users')

export default {

fetchChats: (userId) => {
	return (dispatch) => {
		return db.doc(userId).collection('contacts').where('chat','==',true)
		.get()
		.then((contacts) => {
			contacts.forEach(contact => {
				return dispatch({
					type:constant.CONTACT_CHAT_FETCHED,
					data:contact.data()
				})
			})
		})
		.catch(err => {
			console.log(err.message)
		})
	}
},

openChat: (userId, contact, boolean) => {
	return (dispatch) => {
		return db.doc(userId).collection('contacts').doc(contact.uid)
		.update({
			chat: boolean
		})
		.then(() => {
			if(boolean === true){
				return db.doc(userId).set({
				activeChat:contact.email
				},{merge: true})
				.then(() => {
					return dispatch({
						type:constant.NEW_CHAT_OPENED,
						data:contact
					})
				})
			}else{
				return dispatch({
					type:constant.CHAT_CLOSED,
					data:contact
				})
			}
		})
		.catch(err => {
			console.log(err.message)
		})
	}
},

activateChat: (userId, contact) => {
	console.log(JSON.stringify(contact))
	return (dispatch) => {
	  return db.doc(userId).update({
			activeChat:contact.email
		})
		.then(()=> {
			return dispatch({
				type:constant.CHAT_ACTIVATED,
				data:contact.email
			})
		})
		.catch(err => console.log(err.message))
	}
},

fetchActivatedChat: (userId) => {
	return (dispatch) => {
		return db.doc(userId)
		.get()
		.then((contact)=> {
				return dispatch({
					type: constant.ACTIVE_CHAT_FETCHED, 
					data: contact.data()
				})
			
		})
		.catch(err => console.log(err.message))
	}
},

submitMessage: (user, contact, message) => {
	return (dispatch) => {
		return db.doc(user.uid).collection('chats').doc(contact.email).collection('messages').add({
			text: message,
			from: 'Me: '
		})
		.then(() => {
			return dispatch({
				type: constant.MESSAGE_SENT,
				data: message
			})
		})
		.then(() => {
			return db.doc(contact.uid).collection('chats').doc(user.email).collection('messages').add({
				text: message, 
				from: user.email
			})
		})
		.catch(err => console.log(err.message))
	}
},

fetchMessages: (user) => {
	return (dispatch) => {
		return db.doc(user.uid)
		.get()
		.then((activeContact) => {
			return db.doc(user.uid).collection('chats').doc(activeContact.data().activeChat).collection('messages').get()
			.then(messages => {
				messages.forEach(message=>{
					return dispatch({
						type:constant.MESSAGES_FETCHED,
						data: message.data()
					})
				})
			})
		})
	}
}


}