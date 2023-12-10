
import React from 'react';
import {useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBox from './Component/SearchBox/SearchBox';
import MovieDetails from './Component/MovieItem/MovieItem';
import Header from './Component/Header/Header';
import Favorites from './Component/Favorites/Favorites';
import SavedMovies from './Component/SavedList/SavedList'; // Make sure the correct import is used

import './App.css';

const App = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const [isListSaved, setIsListSaved] = useState(false);
  const addToList = (movie) => {
    const isDuplicate = selectedMovies.some((a) => a.Title === movie.Title);
    if (!isListSaved && !isDuplicate) {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };
  const removeFromList = (index) => {
    const updatedList = [...selectedMovies];
    updatedList.splice(index, 1);
    setSelectedMovies(updatedList);
  };
  const saveListName = (name) => {
   
    setIsListSaved(true);
  };
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route
            path="react-task/"
            element={
              <div className="content" >
                <div className='moiveList'>
                  <SearchBox onAddToList={addToList} isListSaved={isListSaved} />
                  <MovieDetails />
                </div>
                <div className='favoritesList'>
                  <Favorites
                    selectedMovies={selectedMovies}
                    onRemoveFromList={removeFromList}
                    onSaveListName={saveListName}
                  />
                </div>
              </div>
            }
          />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/saved-movies/:listName" element={<SavedMovies savedMovies={selectedMovies} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;





