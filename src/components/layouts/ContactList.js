import React from 'react';

const ContactList = (props) => {

	const contacts = props.contacts.map((contact, i) => {
		return (
				<li 
					className="list-group-item" 
					key={i} 
					style={styles.contactList}
					onClick={props.openChat(contact, true)}
				><div><span className="my-auto">{contact.email}</span>
						<i className="fas fa-caret-down float-right" 
							id="dropdownMenuButton" 
							data-toggle="dropdown" 
							aria-haspopup="true" 
							aria-expanded="false" 
							style={styles.links}>
						</i>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
					    <a className="dropdown-item" >Contact Info</a>
					    <a className="dropdown-item" >Block Contact</a>
					    <a className="dropdown-item" >Delete Conversation </a>
					  </div>
					</div>
				</li>
			)
	})

  return (
  	<div>
  		<hr style={styles.hr}/>
  		<div className="row justify-content-center no-gutters">
  			<div style={styles.ul}>
  				<h4 className="text-center mt-2" style={styles.title}>Contacts</h4>
  				    <ul className="list-group">
  				    	{contacts}
  				    </ul>
  			</div>
  		</div>
  	</div>
  )
}

const styles = {
	title: {
		margin:0,
		color: '#ddd'
	},
		ul: {
		width: 100+'%'
	},
	contactList: {
		border: 'none',
		backgroundColor: 'transparent',
		color: '#ddd'
	},
		hr:{
		borderColor: '#6a6a6a',
		margin:0
	}
}

export default ContactList;