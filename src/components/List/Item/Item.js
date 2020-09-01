import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = (props) => {

    let urgency = null;

    switch (props.urgency) {
        case 0:
            urgency = "low";
            break;
        case 1:
            urgency = "regular";
            break;
        case 2:
            urgency = "high";
            break;
        default:
            urgency = null;
            break;
    }

    const checkCoverText = props.check ? "Check" : "Not Check" ;
    const checkButtonText = props.check ? "Remove Check" : "Check";
    const checkIcon = props.check ? "fa fa-check-square-o" : "fa fa-square-o" ;

        return (
        <li className={'TodoItem ' + urgency}>
            <h2>{props.ID}</h2>
            <h3>{props.name}</h3>
            <p>
                Time : {props.time} Minutes | Urgency : <span className={urgency}>{urgency}</span> | {checkCoverText}
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