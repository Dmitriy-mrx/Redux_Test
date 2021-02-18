import React from 'react';
import { useSelector } from 'react-redux'

function Profile() {
  const user = useSelector(state => state.authenticate);
  const gamesArr = user.score.games
  console.log(user);

  return (
    <>
      <div className='d-flex justify-content-center'>
        <h3 className="display-1">Welcome {user.login}!</h3>
      </div>
      <span className='d-flex justify-content-center'>
        <h3 className="border border-dark bg-warning rounded ">Your total score: {user.score.total}!</h3>
      </span>
      <span className='d-flex justify-content-center'>
        <h3 className="border border-dark bg-warning rounded">Played games:</h3>
      </span>
      {gamesArr.length ? gamesArr.map((el) => {
        return (
          <>
            <div>Title: {el.title}</div>
            <div>Score: {el.score}</div>
          </>
        )
      }) : <h2 className='d-flex justify-content-center text-warning'>Idi igrai mazafaka!</h2>}
    </>
  )
}
export default Profile;
