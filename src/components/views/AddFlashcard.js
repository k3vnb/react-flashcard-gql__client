import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const ADD_FLASHCARD = gql`
  mutation createFlashcard($question: String!, $answer: String!) {
    createFlashcard(input: { question: $question, answer: $answer }) {
      _id
      question
      answer
    }
  }
`;

const FLASHCARDS_QUERY = gql`
{
  allFlashcards {
    _id
    question
    answer
  }
}
`;

const AddFlashcard = ({ history }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [createFlashcard] = useMutation(ADD_FLASHCARD, {
    update(
      cache,
      {
        data: { createFlashcard },
      },
    ) {
      const { allFlashcards } = cache.readQuery({ query: FLASHCARDS_QUERY });

      cache.writeQuery({
        query: FLASHCARDS_QUERY,
        data: { allFlashcards: [...allFlashcards, createFlashcard] },
      });
    },
    onCompleted() { history.push('/') },
  });
  return (
    <div className="container mt-3">
      <div className="box mt-3">
        <form onSubmit={(e) => {
          e.preventDefault();
          createFlashcard({
            variables: {
              question,
              answer,
            },
          });
          toast.success('Flashcard was created successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
        }}
        >

          <div className="field">
            <label htmlFor="question" className="label">Question</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="question"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="answer" className="label">Answer</label>
            <div className="control">
              <textarea
                name="answer"
                id="answer"
                rows="5"
                className="textarea"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default AddFlashcard;
