import React from 'react';

import './index.scss';

const Container = props => {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}

export default Container;