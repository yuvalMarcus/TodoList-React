import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import FilterControl from '../../components/FilterControl/FilterControl';
import List from '../../components/List/List';

const TodoList = props => {

    return (
        <Auxiliary>
            <FilterControl />
            <List />
        </Auxiliary>
    )
}

export default TodoList;