import React, { useState, useRef } from 'react';


import './index.scss';



const Policies = ({func}) => {
    const [check, setCheck] = useState(false);
    const fieldCheckbox = useRef(null);

    const handleChecked = () => {
        const { name, checked } = fieldCheckbox.current;
        setCheck(true);

        if( func ) func(name, checked);
    }


    return (
        <div className="checkbox">
            <input type="checkbox" name="policies" className="checkbox__input" value="male" onChange={handleChecked} ref={fieldCheckbox} />
            <span className="checkbox__title">Accept <a href="#">terms</a> and <a href="#">conditions</a></span>
        </div>
    );
}


export default Policies;