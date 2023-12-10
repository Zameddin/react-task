import React from 'react';
import { useParams } from 'react-router-dom';
import './SavedList.css'
const SavedMovies = ({ savedMovies }) => {
  const { listName } = useParams();
  const decodedListName = decodeURIComponent(listName);

  return (
    <div className='savedList'>
      <div className='listStyle'>
      <h2 className='headerName'> {decodedListName}</h2>
      <ul>
        {savedMovies.map((movie, index) => (
          <li key={index}>{<img className='imageList' src={movie.Poster} alt='poster'/>}{movie.Title}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default SavedMovies;


