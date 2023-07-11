import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage'
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([])

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>
            Workout Tracker
          </h1>
          <p>
            A full stack MERN workout tracker that lets you create, retrieve, update, and delete exercises.
          </p>
        </header>
        <main>
          <Navigation />
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
        </main>
        <footer>
          <p>
            © 2022 Aaron Trinh
          </p>
        </footer>
      </Router>
    </div>
  );
}

export default App;