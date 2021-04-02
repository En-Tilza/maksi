import React, { useEffect, useState } from 'react';

import Field from 'components/field';
import Dropdown from 'components/dropdown';
import Radio from 'components/radio';
import Policies from 'components/policies';


import './index.scss';



const Form = () => {
    const [ disabled, setDisabled ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ resetFields, setResetFields ] = useState(false);
    const [ errors, setErrors ] = useState({
        name: false,
        email: false,
        password: false,
        country: false,
        gender: false,
        policies: false
    });

    useEffect(() => {
        setDisabled( checkForErrors() );
    }, [errors]);

    const func = (name, error) => {
        errors[name] = error;

        setErrors({...errors});
    }

    const checkForErrors = () => {
        let isError = false;

        for(const [key, value] of Object.entries(errors)) {
            if( !value ) isError = true;
        }


        return isError;
    }

    const handleSubmit = event => {
        event.preventDefault();

        setLoading(true);

        setTimeout(() => setLoading(false), 10000)
    }

    const clearForm = event => {
        event.preventDefault();
        

        setErrors({
            name: false,
            email: false,
            password: false,
            country: false,
            gender: false,
            policies: false
        });

        setResetFields(true);
    }

    return (
        <form action="/Authorization" className="login-template" onSubmit={handleSubmit}>
            <p className="login-template__title">Create a new account</p>

            <div className="login-template__wrap">
                <div className="login-template__row">
                    <Field name="name" type="text" title="Enter you name" errorText="Please enter a valid name" func={func} resetFields={resetFields}/>
                </div>
                <div className="login-template__row">
                    <Field name="email" type="email" title="Email" errorText="Please enter a valid email address" icon="/images/email.svg" func={func} resetFields={resetFields} />
                </div>
                <div className="login-template__row">
                    <Field name="password" type="password" title="Password" errorText="Please must contain at least 6 symbols" icon="/images/password.svg" func={func} resetFields={resetFields} />
                </div>
                <div className="login-template__row">
                    <Dropdown values={['Vologda', 'Moscow', 'Saint Petersburg']} title={'Select country'} name="country" func={func}/>
                </div>
                <div className="login-template__row">
                    <Radio func={func} />
                </div>
                <div className="login-template__row">
                    <Policies func={func} />
                </div>
            </div>

            <button type="submit" className="login-template__button" disabled={disabled} >
                {loading ? 
                <div className="loading-animate">
                    <div className="loading-animate__sqr loading-animate__sqr--1"></div>
                    <div className="loading-animate__sqr loading-animate__sqr--2"></div>
                    <div className="loading-animate__sqr loading-animate__sqr--3"></div>
                </div>
                : 'Sign up'}
                
            </button>

            <button type="button" className="form-reset" onClick={clearForm}>Reset</button>
        </form>
    )
}

export default Form;
