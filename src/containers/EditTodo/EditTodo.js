import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleValidation } from '../../handlers/utility';
import './EditTodo.css';

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

class EditTodo extends Component {

    state = {
        elements: {
            name: {
                value: '',
                valid: true,
            },
            time: {
                value: '',
                valid: true,
            },
            urgency: {
                value: '0',
                valid: true,
            },
            description: {
                value: '',
                valid: true,
            }
        },
        selectedItemID: 0
    }

    componentDidMount() {

        const ID = parseInt(this.props.match.params.id);

        const index = this.props.items.findIndex(item => item.ID === ID);

        const item = this.props.items[index];

        const elements = {
            ...this.state.elements,
            name: {
                ...this.state.elements.name,
                value: item.name
            },
            time: {
                ...this.state.elements.time,
                value: item.time
            },
            urgency: {
                ...this.state.elements.urgency,
                value: item.urgency
            },
            description: {
                ...this.state.elements.description,
                value: item.description
            }
        };

        this.setState({
            elements: elements,
            selectedItemID: ID
        });
    }

    handleSubmit = (event) => {

        event.preventDefault();

        let isValid = true;

        const elements = this.state.elements;

        Object.keys(elements).forEach(key => {

            isValid = isValid && elements[key].valid;
        });

        if (isValid) {

            const item = {
                name: this.state.elements.name.value,
                time: this.state.elements.time.value,
                urgency: parseInt(this.state.elements.urgency.value),
                description: this.state.elements.description.value,
                check: false
            };

            this.props.onEditTodoItem(item, this.state.selectedItemID);

            this.props.history.push('/');

        }
    }

    handleChange = (event, validation) => {

        const { value, name } = event.target;

        const isValid = handleValidation(validation, value);

        const elements = { ...this.state.elements};

        elements[name] = {
            ...this.state.elements[name],
            value: value,
            valid: isValid
        };

        this.setState({elements});
    }

    render() {

        let error = false;

        let formElements = elements.map(element => {

            error = error ||
                (!this.state.elements[element.elementConfig.name].valid);

            return (
                <Input
                    key={element.elementConfig.name}
                    elementType={element.elementType}
                    label={element.elementLabel}
                    value={this.state.elements[element.elementConfig.name].value}
                    valid={this.state.elements[element.elementConfig.name].valid}
                    clicked={true}
                    change={event => this.handleChange(event, element.validation)}
                    elementConfig={element.elementConfig}
                />
            )
        });

        let errorMessage = null;

        if(error) {

            errorMessage = <ErrorMessage>Form Not Valid</ErrorMessage>;
        }

        return (
            <Auxiliary>
                <Header />
                <div className={'EditTodoPage'}>
                    <form className={'form'} onSubmit={this.handleSubmit}>
                        {formElements}
                        {errorMessage}
                        <button>Edit Todo</button>
                    </form>
                </div>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTodoToList: (item) => dispatch({type: actionTypes.ADD_TODO_ITEM, item: item}),
        onEditTodoItem: (item, id) => dispatch({type: actionTypes.EDIT_TODO_ITEM, payload: item, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);