import constant from '../constants'

var initialState = {
	messagesList: [],
	messagesLoaded: false
}

export default (state = initialState, action) => {
	const newState = Object.assign({}, state) 
	const newMessages = Object.assign([], newState.messagesList)
	switch (action.type){
		
		case constant.MESSAGE_SENT: 
			newMessages.push(action.data)
			newState['messagesList'] = newMessages
			return newState

		case constant.MESSAGES_FETCHED:
			newState['messagesList'] = action.data
			newState['messagesLoaded'] = true
			
			return newState

		case constant.CHAT_ACTIVATED: 
			newState['messagesList'] = action.data
			return newState

		case constant.CONTACT_ACTIVATED: 
			newState['messagesList'] = []
			return newState

		default:
			return newState
	}
}