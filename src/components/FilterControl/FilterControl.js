import React from 'react';
import { connect } from 'react-redux';
import './FilterControl.css';

import Input from '../UI/Input/Input';
import * as actionTypes from "../../store/actions";

const elements = [
    {
        elementType: 'select',
        elementLabel: 'Order By:  ',
        elementConfig: {
            name: 'orderBy',
            options: [
                {value: '0', displayValue: 'ID'},
                {value: '1', displayValue: 'Time'},
                {value: '2', displayValue: 'Urgency'},
                {value: '3', displayValue: 'Date'}
            ]
        }
    },
    {
        elementType: 'checkbox',
        elementLabel: 'Show Check:  ',
        elementConfig: {
            id:  'showCheckItems',
            name: 'showCheckItems',
            type: 'checkbox'
        }
    },
    {
        elementType: 'checkbox',
        elementLabel: 'Show Not Check:  ',
        elementConfig: {
            id:  'showNotCheckItems',
            name: 'showNotCheckItems',
            type: 'checkbox'
        }
    }
];

const FilterControl = props => {

    const filterChangeHandler = (event, filter) => {

        const element = event.target;

        let value = null;

        switch(element.type) {
            case 'input':
                value = element.value;
                break;
            case 'select-one':
                value = parseInt(element.value);
                break;
            case 'checkbox':
                value = element.checked;
                break;
            default:
                break;
        }

        props.onUpdateFilter(value, filter);
    }

    const formElements = elements.map(element => (
        <Input
            key={element.elementConfig.name}
            elementType={element.elementType}
            label={element.elementLabel}
            value={props[element.elementConfig.name]}
            change={(event) => filterChangeHandler(event, element.elementConfig.name)}
            elementConfig={element.elementConfig}
        />
    ));

    return (
        <div className={'FilterControl'}>
            <div className={'FlexContainer'}>
                {formElements}
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        orderBy: state.filter.orderBy,
        showCheckItems: state.filter.showCheckItems,
        showNotCheckItems: state.filter.showNotCheckItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateFilter: (value, filter) => dispatch({type: actionTypes.UPDATE_FILTER, value: value, filter: filter})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterControl);