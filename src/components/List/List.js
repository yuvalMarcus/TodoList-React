import React, { Component } from 'react';
import { connect } from 'react-redux';
import './List.css';

import * as actionTypes from '../../store/actions';

import Item from "./Item/Item";
import Modal from '../UI/Modal/Modal';

class List extends Component {

    state = {
        selectedItemID: 1,
        modal: false
    }

    modalShow = id => {

        this.setState({
            selectedItemID: id,
            modal: true
        });
    }

    modalClose = () => {

        this.setState({modal: false});
    }

    render() {

        let items = this.props.items;

        switch (this.props.orderBy) {
            case 0:
                items = items.sort((a, b) => {
                    return a.ID-b.ID;
                });
                break;
            case 1:
                items = items.sort((a, b) => {
                    return a.time-b.time;
                });
                break;
            case 2:
                items = items.sort((a, b) => {
                    return b.immediacy-a.immediacy;
                });
                break;
            case 3:
                items = items.sort((a, b) => {
                    return b.ID-a.ID;
                });
                break;
            default:
                items = items.sort((a, b) => {
                    return b.ID-a.ID;
                });
                break;
        }

        let itemsElm = null;

        let emptyTodoList = true;

        if(this.props.showCheckItems || this.props.showNotCheckItems) {

            itemsElm = items.map(item => {

                switch(item.check) {
                    case this.props.showCheckItems:
                    case !this.props.showNotCheckItems:

                        emptyTodoList = false;

                        return <Item
                            key={item.ID}
                            ID={item.ID}
                            name={item.name}
                            time={item.time}
                            immediacy={item.immediacy}
                            check={item.check}
                            checkHandler={() => this.props.onCheckTodoItem(item.ID)}
                            descriptionHandler={() => this.modalShow(item.ID)}
                            removeHandler={() => this.props.onRemoveTodoItem(item.ID)}
                        />;
                        break;
                    default:
                        return null;
                }
            });
        }

        if(emptyTodoList) {
            itemsElm = <li className={'EmptyList'}>empty todo list</li>;
        }

        const selectedItemID = this.state.selectedItemID;

        const item = this.props.items.find((item) => {
            return item.ID === selectedItemID;
        });

        let modal = null;

        if(this.state.modal) {

            modal = (
                <Modal title="Description" close={this.modalClose}>
                        {item.description}
                </Modal>
            );
        }

        return (
            <div>
                {modal}
                <ul className={'TodoList'}>
                    {itemsElm}
                </ul>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        items: state.items,
        orderBy: state.filter.orderBy,
        showCheckItems: state.filter.showCheckItems,
        showNotCheckItems: state.filter.showNotCheckItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckTodoItem: (id) => dispatch({type: actionTypes.CHECK_TODO_ITEM, id: id}),
        onRemoveTodoItem: (id) => dispatch({type: actionTypes.REMOVE_TODO_ITEM, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);