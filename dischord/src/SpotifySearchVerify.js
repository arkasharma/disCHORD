import { useState } from "react";
import SpotifySearch from "./SpotifySearch.js";

// Json error format: {'error': 'invalid_client', 'error_description': 'Invalid client secret'}
// {'error': 'invalid_client', 'error_description': 'Invalid client'}

const SpotifySearchVerify = () => {
    const [client_Id, setClient_Id] = useState(''); //"5771f0e8e76d437fab9f53ab1013b52f";
    const [client_Secret, setClient_Secret] = useState(''); //"ad31668a1ffb41d1bf996971d5be636b";
    const [artist, setArtist] = useState('');
    const [track, setTrack] = useState('');

    const [haveIds, setHaveIds] = useState(false);

    const SearchBar = () => {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Artist Name"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Track Name"
                    value={track}
                    onChange={e => setTrack(e.target.value)}
                />
            </div>
        );
    };

    const spotSear = () => {
        return (
            <div>
                {SearchBar()}
                <SpotifySearch
                    artistName={artist}
                    trackName={track}
                    clientId={client_Id}
                    clientSecret={client_Secret}
                />
            </div>
        );
    }

    const verifyIds = () => {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Client ID"
                    value={client_Id}
                    onChange={(e) => setClient_Id(e.target.value)}
                />
                <input
                    type="password" // Use 'password' type to hide the client secret input
                    placeholder="Client Secret"
                    value={client_Secret}
                    onChange={(e) => setClient_Secret(e.target.value)}
                />
                <button onClick={() => setHaveIds(true)}>Set Ids</button>
            </div>
        );
    }

    return (
        <div>
            {haveIds ? spotSear() : verifyIds()}
        </div>
    );
}

export default SpotifySearchVerify;