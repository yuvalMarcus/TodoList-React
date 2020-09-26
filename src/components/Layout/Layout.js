import React from 'react';
import './Layout.css';

import Auxiliary from '../../hoc/Auxiliary';
import Header from '../../components/Header/Header';

const Layout = (props) => (
    <Auxiliary>
        <div className={'BackgroundPurple'}>
        </div>
        <Header />
        <main className={'Main'}>
            {props.children}
        </main>
    </Auxiliary>
);

export default Layout;