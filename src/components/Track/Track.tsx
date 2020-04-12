import React from 'react';
import './Track.css';

export interface ITrack {
    id: string;
    name: string;
    artist: string;
    album: string;
    image: string;
    uri: string;
};

interface ITrackProps {
    track: ITrack;
    isRemoval: boolean;
    onAdd?: (track: ITrack) => void;
    onRemove?: (track: ITrack) => void;
}

const Track: React.FC<ITrackProps> = props => {

    const addTrack = () => {
        if (props.onAdd) {
            props.onAdd(props.track);
        }
    }

    const removeTrack = () => {
        if (props.onRemove) {
            props.onRemove(props.track);
        }
    }

    const getAlbumCover = () => {
        if (props.track.image) {
            return props.track.image;
        } else {
            return ''
        }
    }

    const getAction = () => {
        if (props.onAdd) {
            return <button className="Track-action" onClick={addTrack}>+</button>
        } else if (props.onRemove) {
            return <button className="Track-action" onClick={removeTrack}>-</button>
        }
    }

    return (
        <div className="Track">
            <div>
                <img className="Track-image" src={getAlbumCover()} alt={props.track.album} />
            </div>
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {getAction()}
        </div>
    );
}

export default Track;