import constant from '../constants'

const db = firebase.firestore().collection('users')

export default {

checkIfUserExists: (user) => {
	return (dispatch) => {
		return db.where('email','==',user.email).get()
		.then(querySnapshot => {
			querySnapshot.forEach((doc) => {
				if(doc !== null){
				}else
					return db.doc(user.uid).set({
						email: user.email,
						chat:  false, 
						activeChat: false
					})
			})
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
					data: {
						email:user.data().email,
						uid:user.id
					}
	 			})
		 	})
		 })
		 .catch(err => {
		 		console.log(err.message)
		 })
	}	
},

fetchContactList: (userId) => {
	return (dispatch) => {
		return db.doc(userId).collection('contacts').where('chat','==',false).get()
		.then(contacts => {
			contacts.forEach(contact => {
				return dispatch({
					type: constant.CONTACTS_FETCHED,
					data: contact.data()
				})
			})
		})
		.catch(err => {
			console.log(err.message)
		})
	}
},

addUserToContactList: (body) => {
	return (dispatch) => {
		return db.doc(body.userId).collection('contacts').doc(body.newContact.uid).set(body.newContact)
		.then(() => {
			return dispatch({
				type:constant.USER_ADDED_TO_CONTACTLIST,
				data:body.newContact
			})
		})
		.catch(err => {
			console.log(err.message)
		})
	}
}





}