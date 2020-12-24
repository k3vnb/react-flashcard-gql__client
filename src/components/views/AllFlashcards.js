import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Flashcard from '../Flashcard';

const FLASHCARDS_QUERY = gql`
  {
    allFlashcards {
      _id
      question
      answer
      isAnswered
    }
  }
`;

const DELETE_FLASHCARD = gql`
  mutation deleteFlashcard($_id: ID!) {
    deleteFlashcard(_id: $_id) {
      _id
    }
  }
`;

const EDIT_FLASHCARD = gql`
  mutation updateFlashcard($_id: ID!, $isAnswered: Boolean) {
    updateFlashcard(_id: $_id, input: { isAnswered: $isAnswered }) {
      _id
      isAnswered
    }
  }
`;

const AllFlashcards = () => {
  const { loading, error, data } = useQuery(FLASHCARDS_QUERY);

  const [deleteFlashcard] = useMutation(DELETE_FLASHCARD, {
    update(
      cache,
      {
        data: { deleteFlashcard },
      },
    ){
      const { allFlashcards } = cache.readQuery({ query: FLASHCARDS_QUERY });
      const updatedFlashcards = allFlashcards.filter((flashcard) => flashcard._id !== deleteFlashcard._id);

      cache.writeQuery({
        query: FLASHCARDS_QUERY,
        data: { allFlashcards: updatedFlashcards },
      });
    },
  });

  const [updateFlashcard] = useMutation(EDIT_FLASHCARD);

  if(loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div className="container mt-3">
      <h1 className="title">
        AllFlashcards
        <button
          className="button is-info is-light ml-3"
          type="button"
          onClick={() => {
            data.allFlashcards.map((flashcard) => {
              if (flashcard.isAnswered){
                updateFlashcard({
                  variables:{
                    _id: flashcard._id,
                    isAnswered: false,
                  },
                });
              }
            });
          }}
        >
          Reset Flashcards
        </button>
      </h1>
      <div className="box has-background-info">
        <div className="columns is-multiline">
          {data.allFlashcards.map((flashcard) => {
            if (!flashcard.isAnswered){
              return (
                <div className="column is-one-third" key={flashcard._id}>
                  <Flashcard flashcard={flashcard} deleteFlashcard={deleteFlashcard} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
 
export default AllFlashcards;
