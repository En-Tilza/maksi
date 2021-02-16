import React, { useState, useRef } from 'react';


import './index.scss';

const Dropdown = ({ values, name, title, func }) => {
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState(title);
    const dropdownRef = useRef(null);

    const choose = (target, value) => {
        setValue(value);
        setOpen(false);
        dropdownRef.current.classList.add('selected');

        if( func ) func(name, true);
    }
    

    const windowClickOutside = event => {
        if( !dropdownRef.current.contains(event.target) ) {
            setOpen(false);

            window.removeEventListener('click', windowClickOutside);
        }
    }

    const handleClick = () => {
        setOpen(prev => !prev);

        if( !open ) window.addEventListener('click', windowClickOutside);
    }

    return (
        <div className="custom-select" ref={dropdownRef}>
            <input type="hidden" name={name} value={value}/>
            <button type="button" className="custom-select-header" onClick={handleClick}>
                <span className="custom-select-header__option">{value}</span>
            </button>

            <div className={open ? 'custom-select-dropdown open' : 'custom-select-dropdown'}>
                {values.map((element, index) => (
                    <p className="custom-select-dropdown__item" key={index} onClick={() => {choose(name, element)}}>{element}</p>
                ))}
            </div>
        </div>
    )
}

export default Dropdown;
