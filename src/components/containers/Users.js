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
		this.props.fetchUsers()
		console.log(this.props.auth)

	}

	componentDidUpdate(){
		console.log(JSON.stringify(this.props.contacts))
	}

	addUserToContactList(user, e){
		e.preventDefault()
		let userId = this.props.auth
		let body = {
			userId: userId,
			newContact: user
		}
		this.props.addUserToContactList(body)
		.then(data => {
			console.log(JSON.stringify(data))
			if(data!==null){
				this.setState({
					message: data.data.email+' was added to your contact list'
				})
			}else{ 
				null
			}
		})
	}

	render() {
	const message = this.state.message
	const users = this.props.users.map((user,i) => {
		return (
			<li key={i} style={styles.link} className="list-group-item" onClick={this.addUserToContactList.bind(this, user)}>{user.email}</li>
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
		users: state.userReducer.usersList,
		contacts: state.userReducer.contactList,
		auth: state.authReducer.currentUser
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchUsers: () => dispatch(UserActions.fetchUsers()),
		addUserToContactList: (body) => dispatch(UserActions.addUserToContactList(body))
	}
}

export default connect(stateToProps, dispatchToProps)(Users)
