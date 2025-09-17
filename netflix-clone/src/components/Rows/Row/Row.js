import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import './row.css';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error('Error fetching row data:', error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
          } else {
            console.log("No trailer found for this title");
            alert("Sorry, no trailer available for this title.");
          }
        })
        .catch((error) => {
          console.error('Error fetching trailer:', error);
          alert("Error loading trailer. Please try again.");
        });
    }
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      
      <div className="row__posters">
        {movies.map(movie => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || movie.title}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      
      {trailerUrl && (
        <>
          <div 
            className="row__overlay"
            onClick={() => setTrailerUrl("")}
          ></div>
          <div className="row__trailer">
            <YouTube videoId={trailerUrl} opts={opts} className="row__youtube" />
            <button 
              className="row__closeTrailer"
              onClick={() => setTrailerUrl("")}
            >
              ×
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Row;