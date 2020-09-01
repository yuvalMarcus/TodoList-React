import React from 'react';

const Input = (props) => {

    let element = null;

    switch(props.elementType) {
        case ('input'):
            element = <input value={props.value} onChange={props.change} {...props.elementConfig} />;
            break;
        case ('textarea'):
            element = <textarea value={props.value} onChange={props.change} {...props.elementConfig} />;
            break;
        case ('select'):
            element = (
                <select
                    name={props.elementConfig.name}
                    value={props.value}
                    onChange={props.change} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        case ('checkbox'):
            element = <input checked={props.value} onChange={props.change} {...props.elementConfig} />;
            break;
        default:
            element = <input value={props.value} onChange={props.change} {...props.elementConfig} />;
            break;
    }

    let classes = ['field'];

    if(props.clicked && !props.valid) {
        classes.push('notValid');
    }

    return (
        <div className={classes.join(' ')}>
            <label htmlFor={props.elementConfig.name}>{props.label}</label>
            {element}
        </div>
    )
}

export default Input;