import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { requests } from '../../utils/requests';
import './banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        // Select a random movie from Netflix Originals
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Function to truncate text if it's too long
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button banner__button--primary">
            <span className="banner__button-icon">▶</span>
            Play
          </button>
          <button className="banner__button banner__button--secondary">
            <span className="banner__button-icon">+</span>
            My List
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 200)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
