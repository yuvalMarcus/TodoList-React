import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = props => {

    return (
        <p className="messegeNotValid">
            {props.children}
        </p>
    )
}

export default ErrorMessage;