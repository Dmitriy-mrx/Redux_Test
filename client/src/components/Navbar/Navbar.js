import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAC } from '../../redux/actionCreators';

function Navbar() {
  const authenticate = useSelector((state) => state.authenticate);
  console.log(authenticate);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    const response = await fetch('/logout');
    if (response.status === 200) {
      dispatch(logoutAC());
      return history.push('/');
    }
    return history.push('/');
  };
  return (
    <div>

      <nav className="navbar  pink scrolling-navbar d-flex justify-content-end bg-primary ">
        &nbsp;
        <Link to="/">
          <button className="btn btn-primary" type="button">Главная</button>
        </Link>
        &nbsp;
        {authenticate
          ?
          <div>
            <Link to="/profile">
              <button className="btn btn-primary" type="button"> Личный кабинет </button>
            </Link>
            &nbsp;
            <button className="btn btn-primary" onClick={handleLogout} type="button">Выйти</button>
          </div>
          : (
            <>
              <Link to="/login">
                <button className="btn btn-primary" type="button">Войти</button>
              </Link>
              &nbsp;
              <Link to="/registration">
                <button className="btn btn-primary" type="button">Зарегистрироваться</button>
              </Link>

            </>
          )}
      </nav>
    </div>
  );
}

export default Navbar;
