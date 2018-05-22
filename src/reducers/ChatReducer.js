import constant from '../constants'

var initialState = {
	chatList: [],
	activeChat: {},
	activeFetched: false,
	chatListFetched: false
}

export default (state = initialState, action) => {

		const newState = Object.assign({}, state)
		let newChatList = Object.assign([], newState.chatList)

		switch(action.type){

//Fetching contact list
			case constant.CHATS_FETCHED:
				newState['chatList'] = action.data
				newState['chatListFetched'] = true
				return newState

//Open new chat 
			case constant.NEW_CHAT_OPENED: 	
				for(let i=0;i<newChatList.length;i++){
					if(newChatList[i].uid == action.data.uid){
					 return newState
					}
				}
				newChatList.unshift(action.data)
				newState['chatList'] = newChatList
				newState['activeChat'] = action.data
				
				return newState

//Delete conversation
			case constant.CHAT_CLOSED:
				for(let i=0;i<newChatList.length;i++){
					if(newChatList[i] == action.data.email){
					 newChatList.splice(i,1)
					}
				}
				newState['chatList'] = newChatList
				return newState

//Fetching if conversation remain opened in las session
			case constant.ACTIVE_CHAT_FETCHED:
				newState['activeChat'] = action.data
				newState['activeFetched'] = true
				return newState

//Activates chat when click it on
			case constant.ACTIVE_CHAT_SET:
				newState['activeChat'] = action.data
				return newState	

//Activates contact when click it on
			case constant.CONTACT_ACTIVATED: 
				newChatList.push(action.data)
				newState['chatList'] = newChatList
				newState['activeChat'] = action.data
				return newState

			case constant.MESSAGE_SENT: 
				newState['activeChat'] = action.data
				return newState
			
			case constant.LOGGED_OUT: 
				return initialState

			default: 
				return newState


		}

}