import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import './row.css';


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

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); 
    } else {
      try {
        let response;
        
        if (movie.media_type === 'tv' || movie.name) {
          response = await axios.get(`/tv/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
        } else {
          response = await axios.get(`/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
        }
        
        const trailer = response.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        
        if (trailer) {
          setTrailerUrl(trailer.key);
        } else {
          console.log("No trailer found for this title");
          alert("Sorry, no trailer available for this title.");
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        alert("Error loading trailer. Please try again.");
      }
    }
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
            <iframe
              src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube trailer"
              className="row__trailerIframe"
            />
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