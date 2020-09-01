import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = props => {

    return ReactDOM.createPortal(
        (
            <div className={'Modal'}>
                <div className={'ModalPopup'}>
                    <div className={'Close'} onClick={props.close}>Close</div>
                    <h2>{props.title}</h2>
                    <div className={'Box'}>
                        {props.children}
                    </div>
                </div>
            </div>
        ),
        document.body,
    )
}

export default Modal;