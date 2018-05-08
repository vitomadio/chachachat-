import constant from '../constants'

	const fb = firebase.auth()

export default {

	login: (credentials) => {
		return (dispatch) => {
			return fb.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(data => {
					return dispatch({
						type: constant.LOGGED_IN,
						data: data
					})
			})
			.catch(err => {
				return err
			})
		}
	},

	signUp: (credentials) => {
		return (dispatch) => {
			return fb.createUserWithEmailAndPassword(credentials.email, credentials.password)
			.then(data => {
				 dispatch({
					type: constant.USER_SIGNED_UP,
					data: data
				});
			})
			.catch(err => {
				return err
			})
		}
	},

	logOut: () => {
		return (dispatch) => {
			return fb.signOut()
			.then((data) => {
				return data
			})
		}
	},

	fetchCurrentUser: () => {
		return (dispatch) => {

		}
	}

}