import React from 'react';

const ChatList = (props) => {
	const active = props.active 
	const chats = props.chats.map((chat, i) => {
		return (
				 (chat.email == active.email) ?
					<li 
						className="list-group-item drop-down" 
						key={i} 
						style={styles.chatListActive}
					>
					<div>
						<span 
						className="my-auto"
						onClick={props.activateChat(chat)}
								>
						{chat.email}
						</span>
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
					    <a className="dropdown-item" 
								onClick={props.deleteConversation(chat)}
					    >Delete Conversation </a>
					  </div>
					</div>
				</li> :
					<li 
						className="list-group-item drop-down" 
						key={i} 
						style={styles.chatList}
					>
					<div>
						<span 
						className="my-auto"
						onClick={props.activateChat(chat)}
								>
						{chat.email}
						</span>
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
					    <a className="dropdown-item" 
								onClick={props.deleteConversation(chat)}
					    >Delete Conversation </a>
					  </div>
					</div>
				</li>
			)
	})

  return (
  	 <div className="row justify-content-center no-gutters">
  	 	<div style={styles.ul}>
  	 		  	 <h4 className="text-center mt-2" style={styles.title}>Chats</h4>
  	 		     <ul className="list-group" >
  	 		    	{chats}
  	 		    </ul>
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
	chatList: {
		border: 'none',
		backgroundColor: 'transparent',
		color: '#ddd',
		verticalAlign: 'middle'
	},
	chatListActive: {
		border: 'none',
		borderRadius: 0,
		backgroundColor: 'transparent',
		color: '#ddd',
		verticalAlign: 'middle',
		backgroundColor: '#464646'
	},
		links: {
		color: '#ddd',
	},

}

export default ChatList;