import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = (props) => {

    let immediacy = null;

    switch (props.immediacy) {
        case 0:
            immediacy = "low";
            break;
        case 1:
            immediacy = "regular";
            break;
        case 2:
            immediacy = "high";
            break;
        default:
            immediacy = null;
            break;
    }

    const checkCoverText = props.check ? "Check" : "Not Check" ;
    const checkButtonText = props.check ? "Remove Check" : "Check";
    const checkIcon = props.check ? "fa fa-check-square-o" : "fa fa-square-o" ;

        return (
        <li className={'TodoItem ' + immediacy}>
            <h2>{props.ID}</h2>
            <h3>{props.name}</h3>
            <p>
                Time : {props.time} Minutes | Immediacy : <span className={immediacy}>{immediacy}</span> | {checkCoverText}
            </p>
            <button onClick={props.descriptionHandler}>Read More</button>
            <button onClick={props.checkHandler}>{checkButtonText}</button>
            <Link to={"/edit-todo/" + props.ID}>
                Edit
            </Link>
            <button onClick={props.removeHandler}>Delete</button>
            <div className={'BackgroundCheck'}>
                {checkCoverText}&nbsp;&nbsp;<i className={checkIcon} aria-hidden="true"></i>
            </div>
        </li>
    )
};

export default Item;