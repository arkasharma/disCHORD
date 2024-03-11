import { Link } from "react-router-dom";
import qs from 'qs';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// npm install dotenv axios
// Json error format: {'error': 'invalid_client', 'error_description': 'Invalid client secret'}
// {'error': 'invalid_client', 'error_description': 'Invalid client'}

const SpotifySearch = ({ artistName, trackName, clientId, clientSecret}) => {
    const [token, setToken] = useState('');
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState('');
    const [errorDes, setErrorDes] = useState('');

    const previewTrack = useRef(null);

    const getAccessToken = async () => {
        const result = await axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({ grant_type: 'client_credentials' }),
            method: 'POST'
        });

        if (result.data.access_token) {
            setToken(result.data.access_token);
            setError('');
            setErrorDes('');
        }
        else if (result.data.error) {
            setError(result.data.error);
            setErrorDes(result.data.error_description);
        }
    };

    const searchSongs = async () => {
        if (!token || !artistName.trim() && !trackName.trim()) return;

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

    return (
        <div>
            <div>
            </div>            
            <div>
                {songs.map((song) => (
                    <div key={song.id} style={{ marginBottom: '20px' }}>
                        {song.album.images.length > 0 && (
                            <img src={song.album.images[0].url} alt={`${song.name} album cover`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                        )}
                        <div>
                            <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                {song.name} by {song.artists.map((artist) => artist.name).join(", ")}
                            </a>
                            {song.preview_url && (
                                <>
                                    <button onClick={() => playPreview(song.preview_url)}>Play</button>
                                    <button onClick={() => pausePreview()}>Pause</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpotifySearch;