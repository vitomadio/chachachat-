import constant from '../constants'

var initialState = {
	chatList: [],
	activeChat: ''
}

export default (state = initialState, action) => {

		const newState = Object.assign({}, state)
		let newChatList = Object.assign([], newState.chatList)

		switch(action.type){

			case constant.CONTACT_CHAT_FETCHED:
				newChatList.push(action.data)
				newState['chatList'] = newChatList
				return newState

			case constant.NEW_CHAT_OPENED: 	
				newChatList.unshift(action.data)
				newState['chatList'] = newChatList
				newState['activeChat'] = action.data.email
				return newState

			case constant.CHAT_CLOSED:
				for(let i=0;i<newChatList.length;i++){
					if(newChatList[i] == action.data){
					 newChatList.splice(i,1)
					}
				}
				newState['chatList'] = newChatList
				return newState		

			case constant.ACTIVE_CHAT_FETCHED:
				newState['activeChat'] = action.data.activeChat
				return newState

			case constant.CHAT_ACTIVATED:
				newState['activeChat'] = action.data
				return newState	

			case constant.LOGGED_OUT: 
				return initialState

			default: 
				return newState


		}

}