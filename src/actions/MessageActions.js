import constant from '../constants'

const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

const db = firestore.collection('users')

export default {

	fetchMessages: (user) => {
		return (dispatch) => {
			return db.doc(user.uid)
			.onSnapshot((currentUser) => {
				if(currentUser.data().activeChat.uid !== ""){
					return db.doc(user.uid).collection('chats').doc(currentUser.data().activeChat.uid).collection('messages').orderBy('timestamp')
					.onSnapshot(messages => {
						var messageList = []
						messages.forEach(message => {
							messageList.push(message.data())
							return dispatch({
								type: constant.MESSAGES_FETCHED,
								data: messageList
							})
						})
					})
				}
			})
		}
	},

	submitMessage: (user, contact, message) => {
		return (dispatch) => {
			return db.doc(user.uid).update({
				activeChat: {
					email:contact.email,
					uid: contact.uid
				}
			})
			.then(() => {
				let docRef = db.doc(user.uid).collection('chats').doc(contact.uid)
				return docRef.set({email:contact.email,
														uid: contact.uid})
				.then(() => {
					return docRef.collection('messages').add({
						sender:user.email,
						recipient:contact.email,
						text:message,
						timestamp: firebase.firestore.FieldValue.serverTimestamp()
					})
				})	
			})
			.then(() => {
				let docRef = db.doc(contact.uid).collection('chats').doc(user.uid)
				return docRef.set({email:user.email,
														uid: user.uid})
				.then(() => {
					return docRef.collection('messages').add({
						sender:user.email,
						recipient:contact.email,
						text:message,
						timestamp: firebase.firestore.FieldValue.serverTimestamp()
					})
				})	
			})
		}
	},

	addMessageToMessagesList: (user, contact, message) => {
		return (dispatch) => {
			return dispatch({
				type: constant.MESSAGE_SENT,
				data:{ 
					sender: user.email,
					recipient: contact.email,
					text: message
				}
			})
		}
	}


}