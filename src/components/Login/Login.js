import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.value, isValid: action.value.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};  
  }
  return {value: '', isValid: false};
};
const passReducer = (state, action ) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.value, isValid: action.value.trim().length > 6};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailReducer, {value: '', isValid: null});
  const [passState, passDispatch] = useReducer(passReducer, {value: '', isValid: null});
  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('checking for validity');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier)
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    emailDispatch({type: 'USER_INPUT', value: event.target.value});
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    passDispatch({type: 'USER_INPUT', value: event.target.value})
    // setEnteredPassword(event.target.value);

    setFormIsValid(
      emailState.value.trim().length > 6 && emailState.value.includes('@')
    );
  };

  const validateEmailHandler = () => {
    emailDispatch({type: 'INPUT_BLUR'});
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    passDispatch({type: 'INPUT_BLUR'});
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
