import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateAC } from '../../redux/actionCreators';
// import './login.css';

function Login() {
  const [inputs, setInputs] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState();

  const { login, password } = inputs;

  const history = useHistory();
  const dispatch = useDispatch();

  function handleInputsChange({ target: { name, value } }) {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await response.json();

    console.log(json);
    const { id, score } = json;
    // const id = json._id;
    if (response.status === 200) {
      dispatch(authenticateAC(id, login, score));
      return history.push('/');
    }
    return setError('Повторите вход');
  };

  return (
    <>
      <div className="container">

        <div className="row d-flex justify-content-center">
          <div className="col-md-offset-3 col-md-6">
            <form className="form-horizontal" onSubmit={handleSubmitClick}>
              <h1 className="heading" >Вход</h1>
              <div className="form-group">
                <label  >
                  Логин
            <input onChange={handleInputsChange} name="login" value={login} type="text" className="form-control" id="inputLogin" placeholder="Login"></input>
                </label>
              </div >
              <div className="form-group">
                <label>
                  Пароль
            <input onChange={handleInputsChange} name="password" value={password} type="password" className="form-control" id="inputPassword" placeholder="Password" />
                </label>
              </div>
              <div className='d-flex justify-content-center'>
                <button className="btn btn-default" type="submit">Логин</button>
                {error}
              </div>
            </form>
          </div>
        </div>


      </div>


    </>
  );
}

export default Login;
