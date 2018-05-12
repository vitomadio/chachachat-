import constant from '../constants'

var initialState = {
	messages: [],
	messagesLoaded: false
}

export default (state = initialState, action) => {
	const newState = Object.assign({}, state) 
	const newMessages = Object.assign([], newState.messages)
	switch (action.type){
		
		case constant.MESSAGE_SENT: 
			newMessages.push(action.data)
			newState['messages'] = newMessages
			return newState

		case constant.MESSAGES_FETCHED:
			newMessages.push(action.data)
			console.log(JSON.stringify(action.data))
			newState['messages'] = newMessages
			newState['messagesLoaded'] = true
			return newState

		default:
			return newState
	}
}