//import { Link } from "react-router-dom";
import qs from "qs";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SpotifySearch.css";
import pauseButton from "./images/pauseButton.png";
import playButton from "./images/playButton.png";
import { useCallback } from "react";
//import linkButton from "./images/linkButton.png";


// npm install dotenv axios

const CopyLinkButton = ({ link }) => {  
  const [notification, setNotification] = useState(null);
  const [fade, setFade] = useState(false);

  const copyToClipboard = async() => {
    try {
      await navigator.clipboard.writeText(link);
      setNotification('Copied!');
    } catch (err) {
      setNotification('Failed to copy link to clipboard');
    }
    setFade(true);
    setTimeout(() => { setNotification(null); setFade(false)}, 2000);
  }

  return (
    <div className="link-and-noti">
      <button className='spot-button2' onClick={copyToClipboard}>
        <span className={`fade-text ${fade ? 'fade' : ''}`}>
          <strong>{notification ? notification : 'Copy Link'}</strong>
        </span>
      </button>
    </div>
  );
}

const SearchBar = ({ artistName, setArtistName, trackName, setTrackName, volume, handleVolumeChange }) => {
  const [sliderBackground, setSliderBackground] = useState('');

  useEffect(() => {
    const percentage = (volume / 1.0) * 100; // Assuming max volume is 1.0
    const adjustedPercentage = percentage + 1.5; // Increase the gradient percentage by 2
    setSliderBackground(`linear-gradient(to right, #ffff 0%, #ffff ${adjustedPercentage}%, #4d4d4d ${adjustedPercentage}%, #4d4d4d 100%)`);
  }, [volume]);


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
        <div className="volume-slider-container">
          Volume
          <input
            className="volume-slider"
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{ background: sliderBackground }}
          />
        </div>
      </div>           
  );
}

const SearchDisplay = ({ artistName, setArtistName, trackName, setTrackName, SearchResults, volume, handleVolumeChange }) => {
  return (
      <div>
          <SearchBar artistName={artistName} setArtistName={setArtistName} trackName={trackName} setTrackName={setTrackName} volume={volume} handleVolumeChange={handleVolumeChange}/>
          <div className="scroll-container">
            <SearchResults />
          </div>
          
      </div>
  )
}

const ErrorDisplay = ({ error, errorDes, clientId, setClientId, clientSecret, setClientSecret}) => {
  const [clientIdInput, setClientIdInput] = useState(clientId);
  const [clientSecretInput, setClientSecretInput] = useState(clientSecret);

  const handleClientIdChange = (event) => {
    setClientIdInput(event.target.value);
  };

  const handleClientSecretChange = (event) => {
    setClientSecretInput(event.target.value);
  };

  const handleButtonClick = () => {
    setClientId(clientIdInput);
    setClientSecret(clientSecretInput);
  };

  return (
    <div className="error-card">
      <div className="err-top-txt"> Please enter a valid Client ID and Client Secret </div>
      <div><strong>Error: </strong>{error}</div>
      <div className="err-txt-bot" ><strong>Error Description: </strong>{errorDes}</div>
      <div>        
        <div><strong>Client ID</strong></div>
        <input
            className="input-stuff"
            type="text"
            placeholder="Client ID"
            value={clientIdInput}
            onChange={handleClientIdChange}
        />
        <div><strong>Client Secret</strong></div>
        <input
            className="input-stuff"
            type="text"
            placeholder="Client Secret"
            value={clientSecretInput}
            onChange={handleClientSecretChange}
        />        
      </div>
      <button className="spot-button" onClick={handleButtonClick}>Set Client ID and Secret</button>
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
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(0.1);




  // get through spotify dev account
  // process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    setVolume(volume);
    if (previewTrack.current) {
      previewTrack.current.volume = volume;
    }
  };

  const getAccessToken = useCallback(async () => {
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
    } catch (error) {
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
  }, [clientId, clientSecret, setToken, setIsError, setError, setErrorDes]);
  
  // Call getAccessToken once when the component mounts
  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  // Automatically search when artistName or trackName changes and token is available
  useEffect(() => {
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

    const delayDebounceFn = setTimeout(() => {
        searchSongs();
    }, 1000); // Add debounce delay of X ms to reduce the number of API calls

    return () => clearTimeout(delayDebounceFn);
  }, [artistName, trackName, token]); // Depend on token as well to ensure we have it before searching

  const playPreview = (songId, previewUrl) => {
    // if clicking on the same song and it's playing, pause it
    if (currentSongId === songId && isPlaying) {
      if (previewTrack.current) {
          previewTrack.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    // If clicking on the same song and it's paused, resume it
    if (currentSongId === songId && !isPlaying) {
      if (previewTrack.current) {
        previewTrack.current.play();
      }
      setIsPlaying(true);
      return;
    }
    
    // if selecting a different song or no current song
    if (currentSongId !== songId || !currentSongId) {
      // pause current track if it's playing
      if (previewTrack.current) {
        previewTrack.current.pause();
      }
      previewTrack.current = new Audio(previewUrl);
      previewTrack.current.volume = 0.1;
      previewTrack.current.play();

      previewTrack.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentSongId(null);
      });

      setIsPlaying(true);
      setCurrentSongId(songId);
      return;
    }
  };

  /*
  const pausePreview = () => {
      if (previewTrack.current) {
          previewTrack.current.pause();
      }
      setIsPlaying(false);
  };
  */

  const SearchResults = () => {
    return (
      <>
        {songs.map((song) => (
          <div className="track-card" key={song.id} style={{ marginBottom: '20px' }}>
            {song.album.images.length > 0 && (
              <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <img className="album-img" src={song.album.images[0].url} alt={`${song.name} album cover`} style={{ width: '85px', height: '85px', marginRight: '10px' }} />
              </a>
            )}
            <div className="card-track-artist">
              <h2>{song.name}</h2>
              <p>{song.artists.map((artist) => artist.name).join(", ")}</p>
              <p>
                <CopyLinkButton link={song.external_urls.spotify}/>
              </p>
            </div>
            <div className="play-button">
              {song.preview_url && (
                <button onClick={() => playPreview(song.id, song.preview_url)}>
                  {currentSongId === song.id && isPlaying ? 
                    (<img src={pauseButton} alt="Pause" style={{ width: '40px', height: '40px' }}/>) : 
                    (<img src={playButton} alt="Play" style={{ width: '40px', height: '40px' }}/>)}
                </button>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div class="main-container">
      {isError ? 
        <ErrorDisplay error={error} errorDes={errorDes} clientId={clientId} setClientId={setClientId} clientSecret={clientSecret} setClientSecret={setClientSecret} getAccessToken={getAccessToken}/> :
        <SearchDisplay artistName={artistName} setArtistName={setArtistName} trackName={trackName} setTrackName={setTrackName} SearchResults={SearchResults} volume={volume} handleVolumeChange={handleVolumeChange}/>
      }
    </div>
  );
};

export default SpotifySearch;