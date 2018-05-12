import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { AuthReducer, UserReducer, ChatReducer, MessageReducer } from '../reducers'

 let store 
 export default {
 	configure: (state) => {
 		const reducers = combineReducers({
			authReducer: AuthReducer,
			userReducer: UserReducer,
			chatReducer: ChatReducer,
			msgReducer: MessageReducer
 		})

 		if(state){
 			store = createStore(
				reducers, 
				state,
				applyMiddleware(thunk)
 				)
 			return store
 		}

 		store = createStore(
				reducers,
				applyMiddleware(thunk)
 			)
 		return store
 	},

 	currentStore: () => {
 		return store
 	}

 }