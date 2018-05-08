import constant from '../constants'

const db = firebase.firestore().collection('users')

export default {

createUserDocument: (body) => {
	return (dispatch) => {
		return db.doc(body.userId).set({
			email: body.email
		})
		.then(() => {
			return {success: true}
		})
	}
},

checkIfUserExists: (email) => {
	return (dispatch) => {
		return db.where('email','==',email).get()
		.then(querySnapshot => {
			querySnapshot.forEach((doc) => {
				return doc
			})
		})
	}
},

fetchUser: (userId) => {
	return (dispatch) => {
		return db.doc(userId).get()

		.then((user) => {
			return dispatch({
				type: constant.USER_FETCHED,
				data: user.data().email
			})
		})
		.catch(err => {
			console.log(err.message)
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


fetchContactList: (userId) => {
	return (dispatch) => {
		return db.doc(userId).collection('contacts').get()
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
		return db.doc(body.userId).collection('contacts').doc(body.newContact.email).set(body.newContact)
		.then(() => {
			console.log(JSON.stringify(body.newContact))
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