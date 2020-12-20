import React from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import './App.css';

import AllFlashcards from './components/views/AllFlashcards';
import AddFlashcard from './components/views/AddFlashcard';
import EditFlashcard from './components/views/EditFlashcard';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <div className="navbar-item">
              <span className="icon is-small mx-2">
                <i className="fas fa-layer-group" />
              </span>
              Flashcards
            </div>
          </div>

          <div className="navbar-end">
            <Link to="/" className="navbar-item">
              <span className="icon is-small mr-2">
                <i className="fas fa-layer-group" />
              </span>
              All Flashcards
            </Link>

            <Link to="/addflashcard" className="navbar-item">
              <span className="icon is-small mr-1">
                <i className="fas fa-plus" />
              </span>
              Add Flashcards
            </Link>
          </div>
        </nav>

        <Route exact path="/" component={AllFlashcards} />
        <Route path="/addflashcard" component={AddFlashcard} />
        <Route path="/flashcard/:id" component={EditFlashcard} />
      </div>
    </Router>
  )
}

export default App;
