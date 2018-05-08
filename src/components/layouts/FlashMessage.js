import React from 'react';

const FlashMessage = (props) => {
  return (
			<div className={props.class}>
				<p className="text-center">{props.message}</p>
			</div>
			
  )
}

export default FlashMessage;