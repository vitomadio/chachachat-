import constant from '../constants'

var initialState = {
	usersList: [],
	contactList: [],
	chatsFetched:false,
	contactsFetched: false,

}

export default (state = initialState, action) => {
	const newState = Object.assign({}, state)
	const newUsersList = Object.assign([], newState.usersList)
	const newContactList = Object.assign([], newState.contactList)

	switch(action.type){

		case constant.USERS_FETCHED: 
			console.log(JSON.stringify(action.data))
			newUsersList.push(action.data)
			newState['usersList'] = newUsersList
			newState['contactsFetched'] = true
			return newState

		case constant.USER_ADDED_TO_CONTACTLIST: 
			newContactList.push(action.data)
			newState['contactList'] = newContactList
			newState['chatsFetched'] = true
			return newState

		case constant.CONTACTS_FETCHED: 
			newContactList.push(action.data)
			newState['contactList'] = newContactList
			newState['chatsFetched'] = true
			return newState	
		
		case constant.NEW_CHAT_OPENED:
			for(let i=0;i<newContactList.length;i++){
				if(newContactList[i] == action.data){
				 newContactList.splice(i,1)
				}
			}
			newState['contactList'] = newContactList
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