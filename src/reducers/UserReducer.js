import constant from '../constants'

var initialState = {
	email: null,
	usersList: [],
	contactList: []
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch(action.type){
		
		case constant.USER_FETCHED: 
			newState['email'] = action.data
			return newState

		case constant.USERS_FETCHED: 
			let newList = Object.assign([], newState.usersList)
			newList.push(action.data)
			newState['usersList'] = newList
			return newState

		case constant.USER_ADDED_TO_CONTACTLIST: 
			let newContactList = Object.assign([], newState.contactList)
			newContactList.push(action.data)
			newState['contactList'] = newContactList
			return newState

		case constant.CONTACTS_FETCHED: 
			let fetchedContactList = Object.assign([], newState.contactList)
			fetchedContactList.push(action.data)
			newState['contactList'] = fetchedContactList
			return newState	

		default: 
			return newState
	}
}