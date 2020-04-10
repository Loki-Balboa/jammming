import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist.tsx';

const Playlist = props => {
    const handleNameChange = e => {
        props.onNameChange(e.target.value);
    }

    return (
        <div className="Playlist">
            <input
                value={props.name}
                onChange={handleNameChange}
            />
            <Tracklist
                tracklist={props.tracks}
                onRemove={props.onRemove}
                isRemoval={true}
            />
            <button
                className="Playlist-save"
                onClick={props.onSave}
            >SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;