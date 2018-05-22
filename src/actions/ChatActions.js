import constant from '../constants'

const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

const db = firestore.collection('users')

export default {

fetchChatList: (user) => {
	return (dispatch) => {
		return db.doc(user.uid).collection('chats')
		.onSnapshot(chats => {
			const chatList = []
			chats.forEach(chat => {
				chatList.push(chat.data())
				return dispatch({
					type: constant.CHATS_FETCHED,
					data: chatList
				})
			})
		})
	}
},

activateChat: (user, contact) => {
	return (dispatch) => {
		return db.doc(user.uid).update({
			activeChat: {
				email: contact.email,
				uid: contact.uid
			}
		})
		.then(() => {
			return db.doc(user.uid).collection('chats').doc(contact.uid).collection('messages')
			.get()
			.then((messages) => {
				let messageList = []
				messages.forEach((message) => {
					messageList.push(message.data())	
					return dispatch({
						type: constant.CHAT_ACTIVATED,
						data: messageList
					})
				})
			})
		})
	}
},

setActiveChat: (contact) => {
	return (dispatch) => {
		return dispatch({
			type: constant.ACTIVE_CHAT_SET,
			data: contact
		})
	}
},

deleteConversation: (user, contact) => {
	return (dispatch) => {
		return db.doc(user.uid).collection('messages').doc(contact).delete()
		.then(() => {
			return dispatch({
				type: constant.CHAT_CLOSED,
				data: {email: contact}
			})
		})
	}
},

fetchActiveChat: (user) => {
	return (dispatch) => {
		return db.doc(user.uid)
		.onSnapshot(doc => {
			if (doc.data().activeChat.uid !== ""){
				let email = doc.data().activeChat.email
				let uid = doc.data().activeChat.uid
				return dispatch({
					type: constant.ACTIVE_CHAT_FETCHED,
					data: {
						email: email,
						uid: uid
					}
				})
			}
		})
	}
}


}