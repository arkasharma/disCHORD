import { Link } from "react-router-dom";
import qs from 'qs';
import { useState, useEffect } from 'react';
import axios from 'axios';

// npm install dotenv axios

const SpotifySearch = () => {
    const [token, setToken] = useState('');
    const [artistName, setArtistName] = useState('');
    const [trackName, setTrackName] = useState('');
    const [songs, setSongs] = useState([]);

    // get through spotify dev account. Located in .env file
    const clientId = "5771f0e8e76d437fab9f53ab1013b52f";
    const clientSecret = "ad31668a1ffb41d1bf996971d5be636b";

    const getAccessToken = async () => {
        const result = await axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({ grant_type: 'client_credentials' }),
            method: 'POST'
        });

        setToken(result.data.access_token);
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



    return (
        <div>
            <input
                type="text"
                placeholder="Artist Name"
                value={artistName}
                onChange={e => setArtistName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Track Name"
                value={trackName}
                onChange={e => setTrackName(e.target.value)}
            />
            <button onClick={searchSongs}>Search</button>
            <div>
                {songs.map(song => (
                    <div key={song.id}>
                        <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            {song.name} by {song.artists.map(artist => artist.name).join(", ")} link: {song.external_urls.spotify}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpotifySearch;