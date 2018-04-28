import React, { Component } from 'react';
import { MessageForm, MessagesDisplay } from '../layouts';



class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			message: null,
			newMessage: null
		}
	}

	submitMessage(){
		let newMessage = this.state.message
		this.setState({newMessage: newMessage})
	}

	render() {
		const newMessage = this.state.newMessage
		return (
			<div className="container-fluid" style={styles.container}>
				<div className="row no-gutter" style={styles.row}>
					<div className="col-md-5 col-lg-4 col-xl-3" style={styles.sideBar}>

					</div>
					<div className="col-md-7 col-lg-8 col-xl-9" style={styles.messagesPanel}>
						<MessagesDisplay
							newMessage={newMessage}
							/>
						<MessageForm 
						 updateMessage={(e) => this.setState({message:e.target.value})}
						 submitMessage={(e) => (e.key === 'Enter') ? this.submitMessage() : null}	
						 />
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	container: {
		height: 100+'vh',
		backgroundColor: '#808080',
		padding: 0,
		overflow: 'hidden'
	},
	row:{
		padding: 0
	},
	sideBar:{
		backgroundColor: '#191919',
		height: 100+'vh'
	},
	messagesPanel: {
		backgroundColor: '#ccc',
		height: 100+'vh'
	}
}

const stateToProps = (state) => {
	return {

	}
}

const dispatchToPorps = (dispatch) => {
	return {

	}
}

export default Home
