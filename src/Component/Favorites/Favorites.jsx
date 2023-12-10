import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';
import logo from './delete.png';

export const Favorites = ({ selectedMovies, onRemoveFromList, onSaveListName }) => {
  const [listName, setListName] = useState('');
  const [isListSaved, setIsListSaved] = useState(false);
  const handleRemove = (index) => {
    if (!isListSaved) {
      onRemoveFromList(index);
    }
  };
  const handleSaveListName = () => {
    if (listName.trim() !== '' && selectedMovies.length > 0) {
      onSaveListName(listName);
      setIsListSaved(true);
    } else {
      alert('Zəhmət olmasa favorilərinizə film əlavə edin.');
    }
  };

  return (
    <div className='list'>
      <p>Favorites</p>
      <input
        className='inputListName'
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Enter list name"
        disabled={isListSaved}
      />
      <br />
      {isListSaved ? (
        <Link to={`/saved-movies/${encodeURIComponent(listName)}`}>
          <button className='saveButton'> Go to saved movies</button>

        </Link>
      ) : (
        <button className='saveButton' onClick={handleSaveListName} disabled={listName.trim() === ''}>
          Save
        </button>
      )}
      <ul>
        {selectedMovies.map((movie, index) => (
          <li key={index}>
            {movie.Title}{' '}
            <img
              className='deleteLogo'
              src={logo}
              alt='logo'
              onClick={() => handleRemove(index)}
              disabled={isListSaved}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;


