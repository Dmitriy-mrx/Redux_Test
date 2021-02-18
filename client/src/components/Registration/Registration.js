import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateAC } from '../../redux/actionCreators';
import './reg.css';

function Registration() {
  const [inputs, setInputs] = useState({
    email: '',
    login: '',
    password: '',
  });
  const [error, setError] = useState();
  const { email, login, password } = inputs;

  function handleInputsChange({ target: { name, value } }) {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const history = useHistory();
  const dispatch = useDispatch();

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        login,
        password,
      }),
    });
    const json = await response.json();
    const score = {};
    const { id } = json;
    if (response.status === 200) {
      dispatch(authenticateAC(id, login, score));
      return history.push('/');
    }
    return setError('Повторите регистрацию');
  };

  return (
    <>
      <div className="container  ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-offset-3 col-md-6">
            <form className="form-horizontal" onSubmit={(event) => handleRegistrationSubmit(event)}>
              <h1 className="heading">Регистрация</h1>
              <div className="form-group">
                <label >
                  Email
            <input className="form-control" id="inputEmail" placeholder="E-mail" onChange={(event) => handleInputsChange(event)} type="email" name="email" required minLength="4" />
                </label>
                <i className="fa fa-user"></i>
              </div>
              <div className="form-group">
                <label >
                  Логин
            <input className="form-control" id="inputLogin" placeholder="Login" onChange={(event) => handleInputsChange(event)} type="text" name="login" required minLength="4" title="Латинские буквы, цифры и _" />
                </label>
              </div>
              <div className="form-group">
                <label >
                  Пароль
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(event) => handleInputsChange(event)} type="password" name="password" required minLength="8" />
                </label>
              </div>
              <div className='d-flex justify-content-center'>
                <button className="btn btn-default " type="submit">Регистрация</button>
              </div>
              {error}
            </form>
          </div>
        </div>

      </div>


    </>
  );
}

export default Registration;
