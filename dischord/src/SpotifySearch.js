import { Link } from "react-router-dom";
import qs from "qs";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SpotifySearch.css";

// npm install dotenv axios

const SearchBar = ({ artistName, setArtistName, trackName, setTrackName }) => {
  return (
      <div className="search-bubble">
        <div className="search-title">
          Spotify Search
        </div>
        <div className="search-input">
          <input
            className="input-stuff"
            type="text"
            placeholder="Artist Name"
            value={artistName}
            onChange={e => setArtistName(e.target.value)}
          />
          <input
            className="input-stuff"
            type="text"
            placeholder="Track Name"
            value={trackName}
            onChange={e => setTrackName(e.target.value)}
          />
        </div>
      </div>           
  );
}

const SearchDisplay = ({ artistName, setArtistName, trackName, setTrackName, SearchResults }) => {
  return (
      <div>
          <SearchBar artistName={artistName} setArtistName={setArtistName} trackName={trackName} setTrackName={setTrackName} />
          <SearchResults />
      </div>
  )
}

const ErrorDisplay = ({ error, errorDes, clientId, setClientId, clientSecret, setClientSecret, getAccessToken}) => {
  return (
    <div className="error-card">
      <p> Please enter a valid Client ID and Client Secret </p>
      <a><strong>Error: </strong>{error}</a>
      <a className="err-txt" ><strong>Error Description: </strong>{errorDes}</a>
      <div>        
        <div><strong>Client ID</strong></div>
      <div> Error: {error} </div>
      <div> Error Description: {errorDes} </div>
      <div>
        <p> Please enter a valid Client ID and Client Secret </p>
        <div> client ID </div>
        <input
            type="text"
            placeholder="Client ID"
            value={clientId}
            onChange={e => setClientId(e.target.value)}
        />
        <div> client Secret </div>
        <input
            type="text"
            placeholder="Client Secret"
            value={clientSecret}
            onChange={e => setClientSecret(e.target.value)}
        />        
      </div>
      <button className="spot-button" onClick={getAccessToken}>Retry Spotify API Keys</button>
    </div>
  );
}

const SpotifySearch = () => {
  const [token, setToken] = useState("");
  const [artistName, setArtistName] = useState("");
  const [trackName, setTrackName] = useState("");
  const [songs, setSongs] = useState([]);

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [errorDes, setErrorDes] = useState('');

  const [clientId, setClientId] = useState(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  const [clientSecret, setClientSecret] = useState(process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

  const previewTrack = useRef(null);


  // get through spotify dev account
  // process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
  // valid client ID: 5771f0e8e76d437fab9f53ab1013b52f
  // valid client secret: ad31668a1ffb41d1bf996971d5be636b

  const getAccessToken = async () => {
    try {
      const result = await axios('https://accounts.spotify.com/api/token', {
          headers: {
              'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify({ grant_type: 'client_credentials' }),
          method: 'POST'
      });
        
      setToken(result.data.access_token);
      setIsError(false);
      setError('');
      setErrorDes('');
    }
    catch (error) {
      // Handling Axios errors
      setIsError(true);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        setError('Request Error: ' + error.response.status);
        setErrorDes(error.response.data.error_description || 'The server responded with an error');
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        setError('Request Error');
        setErrorDes('The request was made but no response was received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setError('Configuration Error');
        setErrorDes('There was an error setting up the request: ' + error.message);
      }
    }
  };

  const searchSongs = async () => {
    if (!token || (!artistName.trim() && !trackName.trim()))
      return;
    const { data } = await axios(`https://api.spotify.com/v1/search?q=${artistName} ${trackName}&type=track&limit=5`, {
      headers: {
          'Authorization': `Bearer ${token}`
      },
      method: 'GET'
    });
    setSongs(data.tracks.items);
  };

  // Call getAccessToken once when the component mounts
  useEffect(() => {
      getAccessToken();
  }, []);

  // Automatically search when artistName or trackName changes and token is available
  useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
          searchSongs();
      }, 1000); // Add debounce delay of X ms to reduce the number of API calls

      return () => clearTimeout(delayDebounceFn);
  }, [artistName, trackName, token]); // Depend on token as well to ensure we have it before searching

  const playPreview = (previewUrl) => {
      if (previewTrack.current) {
          previewTrack.current.pause();
      }

      previewTrack.current = new Audio(previewUrl);
      previewTrack.current.volume = 0.1;
      previewTrack.current.play();
  };

  const pausePreview = () => {
      if (previewTrack.current) {
          previewTrack.current.pause();
      }
  };

  const SearchResults = () => {
    return (
      <>
        <div>
          {songs.map((song) => (
            <div className="track-card" key={song.id} style={{ marginBottom: '20px' }}>
              {song.album.images.length > 0 && (
                <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <img className="album-img" src={song.album.images[0].url} alt={`${song.name} album cover`} style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                </a>
              )}     
              <div className="card-track-artist">
                <h2>{song.name}</h2>
                <p>{song.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
              <div className="play-button">
                {song.preview_url && (
                <>
                  <button className="btn btn-primary" onClick={() => {                    
                  if (previewTrack.current && previewTrack.current.src === song.preview_url) {
                    if (previewTrack.current.paused) {
                    playPreview(song.preview_url);
                    } else {
                    pausePreview();
                    }
                  } else {
                    if (previewTrack.current) {
                    pausePreview();
                    }
                    playPreview(song.preview_url);
                  }
                  }}>
                  {!previewTrack.current || previewTrack.current.paused ? 'Play' : 'Pause'}
                  </button>
                </>
                )}
              </div>              
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
      <div class="scrollable-content">
          {isError ? <ErrorDisplay error={error} errorDes={errorDes} clientId={clientId} setClientId={setClientId} clientSecret={clientSecret} setClientSecret={setClientSecret} getAccessToken={getAccessToken}/> : <SearchDisplay artistName={artistName} setArtistName={setArtistName} trackName={trackName} setTrackName={setTrackName} SearchResults={SearchResults} />}
      </div>
  );
};

export default SpotifySearch;