import React, { useState, useRef } from 'react';


import './index.scss';



const Radio = ({func}) => {
    const [checked, setChecked] = useState(false);
    const fieldRadio = useRef(null);

    const handleChecked = () => {
        const { name } = fieldRadio.current;
        setChecked(true);

        if( !checked && func ) func(name, true);
    }

    return (
        <div className="radio">
            <label className="radio__item">
                <input type="radio" name="gender" className="radio__input" value="male" onChange={handleChecked} ref={fieldRadio} />
                <span className="radio__circle"></span>
                <span className="radio__title">Male</span>
            </label>
            <label className="radio__item">
                <input type="radio" name="gender" className="radio__input" value="famale" onChange={handleChecked} ref={fieldRadio} />
                <span className="radio__circle"></span>
                <span className="radio__title">Famale</span>
            </label>
        </div>
    );
}


export default Radio;