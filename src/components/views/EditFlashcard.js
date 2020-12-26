import React, { useState } from 'react';
import { gql, useQuery, useMutation} from '@apollo/client';
import { toast } from 'react-toastify';

const FLASHCARD_QUERY = gql`
  query getFlashcard($_id: ID!) {
    getFlashcard(_id: $_id){
      _id
      question
      answer
    }
  }
`;

const EDIT_FLASHCARD = gql`
  mutation updateFlashcard($_id: ID!, $question: String, $answer: String){
    updateFlashcard(_id: $_id, input: { question: $question, answer: $answer }) {
      _id
      question
      answer
    }
  }
`;

const EditFlashcard = ({ match, history }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const { loading, error, data } = useQuery(FLASHCARD_QUERY, {
    variables: {
      _id: match.params.id,
    },
  });

  const [updateFlashcard] = useMutation(EDIT_FLASHCARD, { onCompleted() { history.push('/'); } });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const flashcard = data;

  return (
    <div className="container mt-3">
      <div className="box mt-3">
        <form onSubmit={(e) => {
          e.preventDefault();
          updateFlashcard({
            variables: {
              _id: flashcard.getFlashcard._id,
              question: question || flashcard.getFlashcard.question,
              answer: answer || flashcard.getFlashcard.answer,
            },
          });
          toast.success('Flashcard was edited successfully!', {
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
                defaultValue={flashcard.getFlashcard.question}
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
                className="textarea"
                rows="5"
                defaultValue={flashcard.getFlashcard.answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default EditFlashcard;
