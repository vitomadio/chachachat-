import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AuthActions, UserActions } from '../../actions'
import { withRouter, Link } from 'react-router-dom'
import { ContactList } from '../layouts'

class SideNav extends Component {
	constructor(props){
		super(props)
		this.state = {
		
		}
	}

	componentDidMount(){
		const userId = this.props.auth.currentUser
		this.props.fetchContactList(userId)
	}

	logOut(e){
		e.preventDefault()
		
		this.props.logOut()
		.then(() => {
			this.props.history.push('/')
		})

	}

	render() {

		const contacts = this.props.user.contactList.map((contact, i) => {
			return (
					<li className="list-group-item" key={i} style={styles.contactList}>{contact.email}</li>
				)
		})

		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-transparent">
				  <div className="collapse navbar-collapse" id="navbarSupportedContent">
				    <ul className="navbar-nav ml-auto">
				    	<li className="nav-item" >
				    	<span className="navbar-text" style={styles.links}>Hello {this.props.email} !</span>
				    	</li>
				      <li className="nav-item ">
				        <div className="dropdown">
				        	<button className="btn btn-link nav-link" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				        		<i className="fas fa-ellipsis-v" style={styles.links} ></i>
				        	</button>
				        	<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
								    <Link className="dropdown-item" to="/profile">Profile</Link>
								    <a className="dropdown-item" onClick={this.logOut.bind(this)}>logout</a>
								    <Link className="dropdown-item"to="/users">Add Contact</Link>
								  </div>
				        </div>
				      </li>
						</ul>			   
				  </div>
				</nav>
				<hr style={{borderColor:'#ddd'}}/>
				<ContactList contacts={contacts} />
			</div>

		);
	}
}

const styles = {
	links: {
		color: '#ddd',
	},
	contactList: {
		border: 'none',
		backgroundColor: 'transparent',
		color: '#ddd'
	}
}

const stateToProps = (state) => {
	return {
		auth: state.authReducer,
		user: state.userReducer
	}
}

const dispatchToProps = (dispatch) => {
	return {
		logOut: () => dispatch(AuthActions.logOut()),
		fetchContactList: (userId) => dispatch(UserActions.fetchContactList(userId))
	}
}

export default withRouter(connect(stateToProps, dispatchToProps)(SideNav))
