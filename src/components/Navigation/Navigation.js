import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = props => {

    return (
        <nav>
            <Link to="/add-todo">
                <button>Add Todo</button>
            </Link>
        </nav>
    )
};

export default Navigation;