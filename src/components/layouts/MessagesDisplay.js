import React from 'react';

const MessagesDisplay = (props) => {
	const user = props.user
	const message = props.messages.map((message,i) => {
		return (	    	
  		(message !== null) ? 
  			(message.sender == user.email) ? 
  				<li key={i} className="list-group-item" style={styles.li}>
					  <div className="card float-right " style={styles.card}>
  						<div style={styles.arrowRight}></div>
		 			 		<p className="mb-0">Me:</p>
		 			 		<p className="mb-0 text-right">{message.text}</p>
		 			 	</div> 
					</li> :
					<li key={i} className="list-group-item" style={styles.li}>
					  <div className="card" style={styles.card2}>
							<div style={styles.arrowLeft}></div>
		 			 		<p className="mb-0">{message.sender}:</p>
		 			 		<p className="mb-0 text-right">{message.text}</p>
		 			 	</div> 
					</li> 
			: null		  
		)
	})

  return (
    <div className="row" style={styles.row}>
	    <ul className="list-group" style={{width: 100+"%",height: 91+'vh', overflowY: 'scroll'}}>
	     {message}
	     <div ref={props.setRef} />
	    </ul>
		</div>
  )
}

const styles = {
	row: {
		width:100+'%',
	},
	li:{
		width:100+'%',
		backgroundColor: 'transparent',
		border: 'none'
	},
	card: {
		width: 60+'%',
		padding: 1+'em',
		borderRadius: '15px 0px 15px 15px'
	},
	card2: {
		width: 60+'%',
		padding: 1+'em',
		borderRadius: '0px 15px 15px 15px',
		backgroundColor: '#FFF3AA'
	},
	arrowLeft: {
		position: 'absolute',
		top: 0,
		left: '-5px',
		width:0,
		height: 0,
		borderLeft:'10px solid transparent',
		borderRight: '10px solid transparent',
		borderTop: '10px solid #FFF3AA'
	},
		arrowRight: {
		position: 'absolute',
		top: 0,
		right: '-5px',
		width:0,
		height: 0,
		borderLeft:'10px solid transparent',
		borderRight: '10px solid transparent',
		borderTop: '10px solid #fff'
	},

}

export default MessagesDisplay;