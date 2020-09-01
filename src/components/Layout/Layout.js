import React from 'react';
import './Layout.css';

import Auxiliary from '../../hoc/Auxiliary';

const Layout = (props) => (
    <Auxiliary>
        <div className={'BackgroundPurple'}>
        </div>
        <main>
            {props.children}
        </main>
    </Auxiliary>
);

export default Layout;