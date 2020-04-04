import React, { useState } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const App = () => {

  const [searchResults, setSearchResults] = useState([{ name: 'Reise reise', album: 'Reise reise', artist: 'Rammstein' },
  { name: 'Walking in my shoes', album: 'Songs of fate and devotion', artist: 'Depeche mode' },
  { name: 'Match of the pigs', album: 'The Downward Spiral', artist: 'Nine Inch Nails' }])
  const [playlistName, setPlaylistName] = useState('PlaylistName');
  const [playlistTracks, setPlaylistTraks] = useState([{ name: 'Buck dich', album: 'Sensucht', artist: 'Rammstein' },
  { name: 'Go with the flow', album: 'Songs for the deaf', artist: 'Queens of the Stone Age' },
  { name: 'Great Gig in the Sky', album: 'Dark Side of the Moon', artist: 'Pink Floyd' }]);

  const addTrack=track => {
    let tracks = playlistTracks;
    if (!tracks.some(playlistTrack => playlistTrack === track)) {
      tracks.push(track);
      setPlaylistTraks(tracks);
    }
  }

  const removeTrack = track => {
    let tracks = playlistTracks;
    const index = playlistTracks.indexOf(track);
    tracks.splice(index, 1);
    setPlaylistTraks(tracks);
  }

  const updatePlaylistName = name => {
    setPlaylistName(name);
  }

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={searchResults}
              onAdd={addTrack}
            />
            <Playlist
              name={playlistName}
              tracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
}

export default App;
