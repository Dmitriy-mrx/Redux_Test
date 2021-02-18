import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function Question(props) {
  const dispatch = useDispatch();

  const [userAnswer, setAnswer] = useState();
  const [showAnswerTrigger, setShowAnswerTrigger] = useState(false);

  function handlerAnswer() {
    if (userAnswer === props.question.answer) {
      props.setUserScore((value) => value + props.question.price);
    }
    setShowAnswerTrigger(true);
  }

  return (
    <>
      <button type="button" className="p-3 btn btn-info" data-toggle="modal" data-target={`#${props.id}`}>
        {props.question.price}
      </button>

      <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {props.question.title}
            </div>
            <div className="modal-footer">
              {showAnswerTrigger ? props.question.answer : (
                <>
                  <input type="text" onChange={(event) => { setAnswer(event.target.value); }} value={userAnswer} />
                  <button type="button" onClick={handlerAnswer} className="btn btn-primary">Ответить</button>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
