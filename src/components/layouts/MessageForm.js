import React, {Component} from 'react';

class MessageForm extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	// CLEAR TEXTAREA
	handleSubmit(e){
		if(e.key === 'Enter'){
			e.preventDefault()
			let textarea = document.getElementById("messageForm");
			textarea.value = textarea.defaultValue	
		}
		null
	}

	render(){

	  return (
			<div className="row justify-content-center align-items-center" style={styles.messageRow}>
				<form className="form-group mb-0 col-12" >
					<textarea
					 type="text"
					 className="form-control form-control-sm "
					 name="message" 
					 id="messageForm"  
					 rows="1" 
					 placeholder="Write a message" 
					 style={styles.messageInput}
					 onChange={this.props.updateMessage.bind(this)}
					 onKeyDown={(e)=>{this.props.submitMessage(e); this.handleSubmit(e)}}
					 >
					</textarea>
				</form>
			</div>
	  )
	}

}

const styles = {
	messageRow:{
		backgroundColor: '#595959',
		height: 70,
		width: 100+'%',
		position: 'absolute',
		bottom: 0,
		paddingRight: 1+'em'
	},
	messageInput:{
		resize: 'none'
	}
}

export default MessageForm;