import React, { Component } from 'react';
import { UserActions } from '../../actions'
import { connect } from 'react-redux'
import { FlashMessage } from '../layouts'

class Users extends Component {
	constructor(props){
		super(props)
		this.state = {
			message: null
		}
	}

	componentDidMount(){
		if(this.props.user.usersFetched == false){
			this.props.fetchUsers()
		}
	}

	addUserToContactList(user, e){
		e.preventDefault()
		const currentUserId = this.props.auth.currentUser.uid
		this.props.addUserToContactList(currentUserId, user)
		.then(data => {
			if(data!==null){
				this.props.history.push('/home')
			}else{ 
				null
			}
		})
	}

	render() {
		const currentUser = this.props.auth.currentUser
		const message = this.state.message
		const users = this.props.user.usersList.map((user,i) => {
		return (
			(currentUser.uid !== user.uid) ?
				<li key={i} style={styles.link} className="list-group-item" onClick={this.addUserToContactList.bind(this, user)}>{user.email}</li> :
				null
			)
		})

		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-4">
						{(message !== null) ? <FlashMessage message={message} class={"alert alert-success col-md-12"}/> : null}
						<h2>Users</h2>
						<ul className="list-group">
							{users}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	link: {
		cursor: 'pointer'
	}
}

const stateToProps = (state) => {
	return {
	
		user: state.userReducer,
		contacts: state.userReducer.contactList,
		auth: state.authReducer
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchUsers: () => dispatch(UserActions.fetchUsers()),
		addUserToContactList: (currentUserId, user) => dispatch(UserActions.addUserToContactList(currentUserId, user))
	}
}

export default connect(stateToProps, dispatchToProps)(Users)
