import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameAC } from '../../redux/actionCreators';

function Main() {
  const authenticate = useSelector((state) => state.authenticate);
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleStartGame() {
    const response = await fetch('/game');
    const resp = await response.json();
    console.log(resp);
    dispatch(setGameAC(resp));
    return history.push('/game');
  }

  return (
    <>
      <h1>Welcome Page!</h1>
      <div className='d-flex justify-content-center'>
        {authenticate &&
          <button onClick={handleStartGame} to="/game" type="button" className="btn btn-danger btn btn-success btn-lg active" >Start Game</button>}
      </div>
    </>
  )
}

export default Main;



