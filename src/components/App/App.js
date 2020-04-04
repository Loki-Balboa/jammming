import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{ name: 'Reise reise', album: 'Reise reise', artist: 'Rammstein' },
      { name: 'Walking in my shoes', album: 'Songs of fate and devotion', artist: 'Depeche mode' },
      { name: 'Match of the pigs', album: 'The Downward Spiral', artist: 'Nine Inch Nails' }],
      playlistName: 'Playlist name',
      playlistTracks: [{ name: 'Buck dich', album: 'Sensucht', artist: 'Rammstein' },
      { name: 'Go with the flow', album: 'Songs for the deaf', artist: 'Queens of the Stone Age' },
      { name: 'Great Gig in the Sky', album: 'Dark Side of the Moon', artist: 'Pink Floyd' }]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.some(playlistTrack => playlistTrack === track)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    const index = this.state.playlistTracks.indexOf(track);
    tracks.splice(index, 1);
    this.setState({playlistTracks: tracks});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              name={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
