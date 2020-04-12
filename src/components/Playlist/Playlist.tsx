import React, { ChangeEvent } from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';
import { ITrack } from '../Track/Track';

interface PlaylistProps {
    name: string;
    tracks: ITrack[];
    onNameChange: (name: string) => void;
    onRemove: (track: ITrack) => void;
    onSave: () => void;
}

const Playlist: React.FC<PlaylistProps> = props => {

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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