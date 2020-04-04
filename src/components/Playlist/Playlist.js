import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

const Playlist = props => {

    const handleNameChange = e => {
        props.onNameChange(e.target.value);
    }

    return (
        <div className="Playlist">
            <input
                defaultValue={props.name}
                onChange={handleNameChange}
            />
            <Tracklist
                tracklist={props.tracks}
                onRemove={props.onRemove}
                isRemoval={true}
            />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;