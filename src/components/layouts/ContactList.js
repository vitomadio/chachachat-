import React from 'react';

const ContactList = (props) => {
  return (
    <ul className="list-group">
    	{props.contacts}
    </ul>
  )
}

export default ContactList;