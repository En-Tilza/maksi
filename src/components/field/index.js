import React, { useState, useRef, useEffect } from 'react';


import './index.scss';



const Field = ({name, type, title, errorText, icon, func, resetFields}) => {
    const [fieldActive, setFieldActive] = useState(false);
    const [fieldError, setFieldError] = useState(false);

    const fieldInput = useRef(null);

    useEffect(() => {
        fieldInput.current.value = '';
        setFieldActive(false);
        setFieldError(false);
    }, [resetFields]);

    const handleClick = () => {
        setFieldActive(true);
        fieldInput.current.focus();
    }

    const handleBlur = () => {
        if( fieldInput.current.value == '' ) setFieldActive(false);
    }

    const checkFieldName = value => {
        const regexp = /^[a-zA-Z_ ]*$/i;

        return !regexp.test(value);
    }

    const checkFieldEmail = value => {
        const regexp = /([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        return !regexp.test(value);
    }

    const checkFieldPassword = value => {
        return (value.length < 6);
    }

    const fieldValidation = () => {
        const { value, name } = fieldInput.current;

        let result = false;
        switch(name) {
            case 'name': result = checkFieldName(value); break;
            case 'email': result = checkFieldEmail(value); break;
            case 'password': result = checkFieldPassword(value); break;
        }

        if( func ) func(name, !result);

        setFieldError(result);
    }

    const labelClasses = () => {
        let labelClass = 'field';

        if( fieldError ) labelClass += ' error';
        if( fieldActive ) labelClass += ' active';
        if( icon ) labelClass += ' has-icon';

        return labelClass;
    }

    return (
        <label className={labelClasses()} onClick={handleClick}>
            <span className="field__wrap">
                {icon ? 
                    <img src={icon} className="field__icon" />
                : null}
                <span className="field__title">{title}</span>
            </span>
            <input type={type} name={name} className="field__input" ref={fieldInput} onFocus={() => setFieldActive(true)} onBlur={handleBlur} onInput={fieldValidation} autoComplete="off" />
            <span className="field__error">{errorText}</span>
        </label>
    );
}

export default Field;
