import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

import Navigation from '../Navigation/Navigation';

const Header = props => {

    return (
        <header>
            <div className={'Logo'}>
                <Link to="/">
                    <i className="fa fa-list-ol" aria-hidden="true"></i>&nbsp;&nbsp;Todo List
                </Link>
            </div>
            <Navigation />
        </header>
    )
};

export default Header;