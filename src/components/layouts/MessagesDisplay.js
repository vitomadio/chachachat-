import React from 'react';

const MessagesDisplay = (props) => {
	
	const message = props.messages.map((message,i) => {
		return (	    	
  		(message !== null) ? 
  			(message.from == 'Me') ? 
  				<li key={i} className="list-group-item" style={styles.li}>
					  <div className="card float-right " style={styles.card}>
		 			 		<p className="mb-0">{message.from}:</p>
		 			 		<p className="mb-0 text-right">{message.text}</p>
		 			 	</div> 
					</li> :
					<li key={i} className="list-group-item" style={styles.li}>
					  <div className="card" style={styles.card2}>
		 			 		<p className="mb-0">{message.from}:</p>
		 			 		<p className="mb-0 text-right">{message.text}</p>
		 			 	</div> 
					</li> 
			: null		  
		)
	})

  return (
    <div className="row" style={styles.row}>
	    <ul className="list-group" style={{width: 100+"%"}}>
	      {message}
	    </ul>
		</div>
  )
}

const styles = {
	row: {
		width:100+'%'
	},
	li:{
		width:100+'%',
		backgroundColor: 'transparent',
		border: 'none'
	},
	card: {
		width: 60+'%',
		padding: 1+'em',
		borderRadiusTopLeft: 0,
		borderRadiusTopRight: 10,
		borderRadiusBottomLeft: 10,
		borderRadiusBottomRight: 10,
	},
	card2: {
		width: 60+'%',
		padding: 1+'em',
		borderRadiusTopLeft: 0,
		borderRadiusTopRight: 10,
		borderRadiusBottomLeft: 10,
		borderRadiusBottomRight: 10,
		backgroundColor: '#FFF3AA'
	}

}

export default MessagesDisplay;