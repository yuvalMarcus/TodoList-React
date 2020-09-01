import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Header from '../../components/Header/Header';
import FilterControl from '../../components/FilterControl/FilterControl';
import List from '../../components/List/List';

const TodoList = props => {

    return (
        <Auxiliary>
            <Header />
            <FilterControl />
            <List />
        </Auxiliary>
    )
}

export default TodoList;