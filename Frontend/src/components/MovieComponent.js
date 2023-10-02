import React from 'react';
import { Link } from 'react-router-dom';

const MovieComponent = ({ movies }) => {
  return (
    <div className="moviecomponent">
      {movies.map((movie) => (
      <Link to={'/'+movie.show.id}>
        {movie.show.image && movie.show.image.medium && 
        <div key={movie.show.id} className="movie-card">
          <img src={movie.show.image.medium} alt={movie.show.name} />
          <div className="intro">
            <h3>{movie.show.name}</h3> 
            <p className="rating">Average Rating: {movie.show.rating.average}</p>
            <p>Runtime: {movie.show.runtime} minutes</p>
            <p className="genres">
              Genres: {movie.show.genres.map((val, index) => (
                <span key={index}>{val}</span>
                ))}
            </p>
            <button>View Summary</button>
          </div>
        </div>}
      </Link>
      ))}
    </div>
  );
};

export default MovieComponent;
