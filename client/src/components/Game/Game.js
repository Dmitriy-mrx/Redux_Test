import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from '../Question/Question';

function Game() {
  const game = useSelector((state) => state.game.games);
  const [userScore, setUserScore] = useState(0);

  const themes = game.map((theme) => (
    <div className="d-flex">
      <h5 className="p-3">{theme.title}</h5>

      {theme.questions.map((question, i) => (
        <Question id={"modal" + i} question={question} setUserScore={setUserScore} />
      ))}

      {/* {theme.questions.map((question) => <p onClick={handlerShowQuestion} key={question.id} id={question.id} className="p-3 ">{question.price}</p>)} */}

    </div>
  ));
  return (
    <div>
      {themes}

      <div>
        {userScore}
      </div>
    </div>
  );
}

export default Game;
