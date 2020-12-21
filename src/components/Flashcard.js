import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import ReactCardFlip from 'react-card-flip';
import { toast } from 'react-toastify';

const EDIT_FLASHCARD = gql`
  mutation updateFlashcard($_id: ID!, $isAnswered: Boolean) {
    updateFlashcard(_id: $_id, input: {isAnswered: $isAnswered }) {
      _id
      isAnswered
    }
  }
`;

const Flashcard = ({ flashcard, deleteFlashcard }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [updateFlashcard] = useMutation(EDIT_FLASHCARD);

  return (
    <div className="card">
      <header className="card-header" style={{ display: 'block' }}>
        <div className="level">
          <div className="level-left">
            <div className="level-item p-2">
              <p className="buttons">
                <button className="button" type="button" onClick={() => setShowAnswer(!showAnswer)}>
                  <span className="icon is-small">
                    <i className="fas fa-sync alt" />
                  </span>
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    updateFlashcard({
                      variables: {
                        _id: flashcard._id,
                        isAnswered: true,
                      }
                    })
                  }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-check" />
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item p-2">
            <p className="buttons">
              <button className="button" type="button">
                  <Link to={`flashcard/${flashcard._id}`}>
                    <span className="icon is-small has-text dark">
                      <i className="fas fa-pen" />
                    </span>
                  </Link>
              </button>
              <button
                className="button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  deleteFlashcard({ variables: { _id: flashcard._id } });
                  toast.success('Flashcard was deleted', {
                    position: toast.POSITION.TOP_CENTER,
                  });
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-trash" />
                </span>
              </button>
            </p>
          </div>
        </div>
      </header>
      <ReactCardFlip isFlipped={showAnswer} flipDirection="vertical">
        <div className="card-content m-2 has-background-warning">
          <div className="content">
            {flashcard.question}
            <br />
          </div>
        </div>
        <div className="card-content m-2 has-background-success has-text-white">
          <div className="content">
            {flashcard.answer}
            <br />
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Flashcard;
