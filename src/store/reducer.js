import * as actionTypes from './actions';

const initialState = {
    items: [
        {ID: 1, name: "name", time: 15, immediacy: 0, description: "description", check: false},
        {ID: 2, name: "name2", time: 60, immediacy: 1, description: "description", check: true},
        {ID: 3, name: "name3", time: 30, immediacy: 2, description: "description", check: true},
        {ID: 4, name: "name4", time: 30, immediacy: 1, description: "description", check: false},
        {ID: 5, name: "name5", time: 10, immediacy: 0, description: "description", check: false}
    ],
    lastID: 5,
    filter: {
        orderBy: 0,
        showCheckItems: true,
        showNotCheckItems: true,
    }
};

const reducer = (state = initialState, action) => {

    const list = [...state.items];

    let index = null;

    if(action.id) {

        index = list.findIndex(item => {
            return item.ID === action.id;
        });
    }

    switch (action.type) {
        case (actionTypes.ADD_TODO_ITEM):
            const item = {
                ...action.item,
                ID: ++state.lastID
            };

            return {
                ...state,
                items: state.items.concat(item)
            };
        case (actionTypes.CHECK_TODO_ITEM):

            list[index] = {
                ...list[index],
                check: !list[index].check
            };

            return {
                ...state,
                items: list
            };
        case (actionTypes.EDIT_TODO_ITEM):

            list[index] = {
                ...list[index],
                name: action.payload.name,
                time: action.payload.time,
                immediacy: action.payload.immediacy,
                description: action.payload.description
            };

            return {
                ...state,
                items: list
            };
        case (actionTypes.REMOVE_TODO_ITEM):

            return {
                ...state,
                items: state.items.filter(item => item.ID !== action.id)
            };
        case (actionTypes.UPDATE_FILTER):
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.filter]: action.value
                }
            };
        default:
            return state
    }
};

export default reducer;