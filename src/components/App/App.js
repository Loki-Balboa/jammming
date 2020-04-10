import React, { useState, useEffect } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.ts';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('Playlist name');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();
  });

  const search = async (searchTerm) => {
    const tracks = await Spotify.search(searchTerm);
    if (tracks) {
      setSearchResults(tracks.filter(track => !playlistTracks.some(playlistTrack => playlistTrack.uri === track.uri)));
    }
  }

  const addTrack = (track) => {
    if (!playlistTracks.some(playlistTrack => playlistTrack === track)) {
      const tracks = playlistTracks.concat(track);
      const resultTracks = searchResults.filter(result => result !== track);
      setPlaylistTracks(tracks);
      setSearchResults(resultTracks);
    }
  }

  const removeTrack = (track) => {
    const tracks = playlistTracks.filter(playlistTrack => playlistTrack !== track)
    setPlaylistTracks(tracks);
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
    const success = Spotify.savePlaylist(playlistName, playlistTracks);
    if (success) {
      setPlaylistTracks([]);
      setPlaylistName('Playlist Name');
    }
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
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
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;