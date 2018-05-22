import constant from '../constants'

var initialState = {
	
	usersList: [],
	contactList: [],
	chatsFetched:false,
	contactsFetched: false,
	usersFetched: false,

}

export default (state = initialState, action) => {
	const newState = Object.assign({}, state)
	const newUsersList = Object.assign([], newState.usersList)
	const newContactList = Object.assign([], newState.contactList)

	switch(action.type){

		case constant.USERS_FETCHED: //Ready
			newUsersList.push(action.data)
			newState['usersList'] = newUsersList
			newState['usersFetched'] = true
			return newState

		case constant.USER_ADDED_TO_CONTACTLIST: 
			newContactList.push(action.data)
			newState['contactList'] = newContactList

			return newState

		case constant.CONTACTS_FETCHED: 
			newContactList.push(action.data)
			newState['contactList'] = newContactList
			newState['contactsFetched'] = true
			
			return newState				

		case constant.CHAT_CLOSED: 
			newContactList.push(action.data)
			newState['contactList'] = newContactList
			return newState

		case constant.LOGGED_OUT: 
				return initialState	

		default: 
			return newState
	}
}