import React from 'react';

const MessagesDisplay = (props) => {
	
	const newMessage = props.newMessage
  return (
    <div className="row" style={styles.row}>
	    <div className="list-group">
	    	{
	    		(newMessage !== null) ? <div className="list-group-item  col-md-7" style={styles.col}>
    			 	<div className="card" style={styles.card}>
    			 		Me: {newMessage}
    			 	</div> 
    			</div> : null
	    	}
	    </div>
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
		borderRadius: 1+'em'
	}
}

export default MessagesDisplay;