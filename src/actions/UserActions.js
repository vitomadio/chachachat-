import constant from '../constants'

const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

const db = firestore.collection('users')

export default {

checkIfUserExists: (user) => {

	return (dispatch) => {
		return db.doc(user.uid).get()
		.then(doc => {
			
				if(doc.data() == null){
					return db.doc(user.uid).set({
						email: user.email,
						uid: user.uid,
						activeChat: {
							email:"",
							uid:""
						}
					})
					.then(() => {
						return dispatch({
							type: constant.CURRENT_USER_FETCHED,
							data: user
						})
					})
				}else{
					return dispatch({
						type: constant.CURRENT_USER_FETCHED,
						data: user
					})
				}
			
		})
	}
},

fetchUsers: () => {
	return (dispatch) => {
		return db.get()
		 .then(users => {
		 	users.forEach(user => {
			 	return dispatch({
					type: constant.USERS_FETCHED,
					data: user.data()
	 			})
		 	})
		 })
		 .catch(err => {
		 		console.log(err.message)
		 })
	}	
},

fetchContactList: (user) => {
	return (dispatch) => {
		return db.doc(user.uid).collection('contacts').get()
		.then(contacts => {
			contacts.forEach(contact => {
						return dispatch({
							type: constant.CONTACTS_FETCHED,
							data: contact.data()
					})
				
			})
		})
	}
},

fetchActiveContact: (user) => {
	return (dispatch) => {
		return db.doc(user.uid)
		.get()
		.then((currentUser)=> {
			if(!currentUser.data().activeChat.uid){
				return dispatch({
					type: constant.ACTIVE_CONTACT_FETCHED, 
					data: {email: '', uid: ''}
				})
			}else{
				return db.doc(currentUser.data().activeChat.uid).get()
				.then((active) => {
					return dispatch({
						type: constant.ACTIVE_CONTACT_FETCHED, 
						data: {
							email:active.data().email,
							uid: active.id
						}
					})
				})	
			}
		})
		.catch(err => console.log(err.message))
	}
},

addUserToContactList: (currentUserId,user) => {
	return (dispatch) => {
		return db.doc(currentUserId).collection('contacts').doc(user.uid).set(user)
		.then(() => {
			return dispatch({
				type:constant.USER_ADDED_TO_CONTACTLIST,
				data:{
					email: user.email,
					uid: user.uid,
					conversation: false
				}
			})
		})
		.catch(err => {
			console.log(err.message)
		})
	}
},

unknownContactChat: (user, contact) => {
	return (dispatch) => {
		// return db.doc(contact.uid).collection('contacts').doc(user.uid).set()
	}
},

activateContact: (contact) => {
	return (dispatch) => {
		return dispatch({
			type:constant.CONTACT_ACTIVATED,
			data:contact
		})
	}
},

//After submit message change contact to chatList
contactStateUpdate: (user, contact, message) => {
	return (dispatch) => {
		return db.doc(user.uid).collection('contacts').doc(contact.uid).get()
		.then(doc => {
			if(doc.data().conversation == true){
				return null
			}else{
				return db.doc(user.uid).collection('contacts').doc(contact.uid).update({
					conversation: true
				})
			}
		})
	}
}

}