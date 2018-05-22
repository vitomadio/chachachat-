import constant from '../constants'

var initialState = {
	currentUser: {}
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch(action.type){
		case constant.LOGGED_IN: 
			newState['currentUser'] = action.data
			return newState

		case constant.USER_SIGNED_UP:
			newState['currentUser'] = action.data
			return newState

		default: 
			return newState
	}
}