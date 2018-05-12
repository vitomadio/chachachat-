import React from 'react';

const MessagesDisplay = (props) => {
	
	const message = props.messages.map((message,i) => {
		return (	    	
  		(message !== null) ? <li key={i} className="list-group-item" style={styles.col}>
			 	<div className="card" style={styles.card}>
			 		<p className="mb-0">{message.from}:</p>
			 		 <p className="mb-0">{message.text}</p>
			 	</div> 
			</li> : null		  
		)
	})

  return (
    <div className="row" style={styles.row}>
	    <ul className="list-group col-md-7">
	      {message}
	    </ul>
		</div>
  )
}

const styles = {
	row: {
		width:100+'%'
	},
	col:{
		backgroundColor: 'transparent',
		border: 'none'
	},
	card: {
		padding: 1+'em',
		borderRadiusInputTopLeft: 0,
		borderRadiusInputTopRight: 10,
		borderRadiusInputBottomLeft: 10,
		borderRadiusInputBottomRight: 10,
	}
}

export default MessagesDisplay;