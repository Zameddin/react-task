import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchBox.css';

const SearchBox = ({ onAddToList, isListSaved }) => {
  const [first, getFirst] = useState('');
  const [text, setText] = useState([]);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    fetch('https://www.omdbapi.com/?s=iron&apikey=aa01eba0')
      .then((res) => res.json())
      .then((a) => {
        if (a.Response === 'True') {
          setText(a.Search);
          setSearchError(false);
        } else {
          setText([]);
          setSearchError(true);
        }
      })
      .catch((error) => {
        setSearchError(true);
      });
  }, []);
  
  const buttonClick = () => {
    if (first.trim() !== '') {
      check();
    }
  };
  const main = (e) => {
    getFirst(e.target.value.toLowerCase().trim(''));
  };
  const check = () => {
    fetch(`https://www.omdbapi.com/?s=${first}&apikey=aa01eba0`)
      .then((res) => res.json())
      .then((a) => {
        if (a.Response === 'True') {
          setText(a.Search);
          setSearchError(false);
        } else {
          setText([]);
          setSearchError(true);
        }
      })
      .catch((error) => {
        setSearchError(true);
      });
  };
  const addToMovieList = (movie) => {
    if (!isListSaved) {
      onAddToList(movie);
    }
  };
  return (
    <div className="box">
      <input onChange={main} className="main" placeholder="Axtarin..."></input>
      <button className='button1' onClick={buttonClick}>Axtar</button>
      <div className='film-container'>
        {searchError ? (
          <p className="error-message">Sorğu çoxluğu vəya səhv ad daxil edildiyi üçün nəticə tapılmadı...</p>
        ) : (
          text.map((a, b) => (
            <div className="search" key={b}>
              <div className='image-name'>
                <img src={a.Poster} alt="img" />
                <p>{a.Title}</p>
              </div>
              <div className='detail-addList'>
                <button className='add-to-list' onClick={() => addToMovieList(a)}>
                  Add to List
                </button>
                <Link to={`/details/${a.imdbID}`}>
                  <button  className='detail'>Details</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBox;

