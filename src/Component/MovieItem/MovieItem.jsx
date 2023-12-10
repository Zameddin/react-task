import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieItem.css'

const MovieItem = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=aa01eba0`);
        const data = await response.json();
        setMovieDetails(data);
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="details-container">

      {Object.keys(movieDetails).length > 0 ? (
        <>
              <div className='details'>
          <h1 >{movieDetails.Title}</h1>
          <p>{movieDetails.Plot}</p>
          <img src={movieDetails.Poster} alt='movie'/> 
          <br/>
            <a  href={`https://www.imdb.com/title/${movieDetails.imdbID}`} target="_blank" rel="noopener noreferrer">
            <button  className='imdb'>
            IMDb Link
            </button>
          </a>
          </div>
        </>
      ) : (
      <p className='none'></p>
      )}
      
    </div>
  );
};
export default MovieItem;