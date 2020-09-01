import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleValidation } from '../../handlers/utility';
import './AddTodo.css';

import * as actionTypes from '../../store/actions';

import Auxiliary from '../../hoc/Auxiliary';
import Header from '../../components/Header/Header';
import Input from '../../components/UI/Input/Input';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';

const elements = [
    {
        elementType: 'input',
        elementLabel: 'Name',
        elementConfig: {
            type: 'text',
            placeholder: 'Name',
            name: 'name',
        },
        validation: {
            required: true,
            maxLength: 15
        }
    },
    {
        elementType: 'input',
        elementLabel: 'Time',
        elementConfig: {
            type: 'number',
            placeholder: 'Time In Minutes',
            name: 'time',
        },
        validation: {
            required: true,
            maxLength: 4
        }
    },
    {
        elementType: 'select',
        elementLabel: 'Urgency',
        elementConfig: {
            options: [
                {value: 0, displayValue: 'low'},
                {value: 1, displayValue: 'regular'},
                {value: 2, displayValue: 'high'}
            ],
            name: 'urgency'
        },
        validation: {
            required: true
        }
    },
    {
        elementType: 'textarea',
        elementLabel: 'Description',
        elementConfig: {
            type: 'text',
            placeholder: '',
            name: 'description',
        },
        validation: {
            required: false,
            maxLength: 60
        }
    }
]

class AddTodo extends Component {

    state = {
        elements: {
            name: {
                value: '',
                valid: false,
                clicked: false
            },
            time: {
                value: '',
                valid: false,
                clicked: false
            },
            urgency: {
                value: '0',
                valid: true,
                clicked: false
            },
            description: {
                value: '',
                valid: false,
                clicked: false
            }
        },
        error: false
    }

    handleSubmit = (event) => {

        event.preventDefault();

        let isValid = true;

        const elements = this.state.elements;

        Object.keys(elements).forEach(key => {

            isValid = isValid && elements[key].valid;
        });

        if(isValid) {

            const item = {
                name: this.state.elements.name.value,
                time: this.state.elements.time.value,
                urgency: parseInt(this.state.elements.urgency.value),
                description: this.state.elements.description.value,
                check: false
            };

            this.props.onAddTodoToList(item);

            this.props.history.push('/');

        } else {

            const elements = {
                ...this.state.elements,
                name: {
                    ...this.state.elements.name,
                    clicked: true
                },
                time: {
                    ...this.state.elements.time,
                    clicked: true
                },
                urgency: {
                    ...this.state.elements.urgency,
                    clicked: true
                },
                description: {
                    ...this.state.elements.description,
                    clicked: true
                }
            };

            this.setState({elements:elements, error: true});
        }
    }

    handleChange = (event, validation) => {

        const { value, name } = event.target;

        const isValid = handleValidation(validation, value);

        const elements = { ...this.state.elements};
        elements[name] = {
            ...this.state.elements[name],
            value: value,
            valid: isValid,
            clicked: true
        };

        this.setState({elements: elements, error: false});
    }

    render() {

        let error = false;

        let formElements = elements.map(element => {

            error = error ||
                (this.state.elements[element.elementConfig.name].clicked && !this.state.elements[element.elementConfig.name].valid);

            return (
                <Input
                    key={element.elementConfig.name}
                    elementType={element.elementType}
                    label={element.elementLabel}
                    value={this.state.elements[element.elementConfig.name].value}
                    valid={this.state.elements[element.elementConfig.name].valid}
                    clicked={this.state.elements[element.elementConfig.name].clicked}
                    change={event => this.handleChange(event, element.validation)}
                    elementConfig={element.elementConfig}
                />
            )
        });

        let errorMessage = null;

        if(this.state.error || error) {

            errorMessage = <ErrorMessage>Form Not Valid</ErrorMessage>;
        }

        return (
            <Auxiliary>
                <Header />
                <div className={'addTodoPage'}>
                    <form className={'form'} onSubmit={this.handleSubmit}>
                        {formElements}
                        {errorMessage}
                        <button>Add Todo</button>
                    </form>
                </div>
            </Auxiliary>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onAddTodoToList: (item) => dispatch({type: actionTypes.ADD_TODO_ITEM, item: item})
    }
};

export default connect(null, mapDispatchToProps)(AddTodo);