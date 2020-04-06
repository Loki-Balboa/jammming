import React from 'react';
import './Track.css';

const Track = props => {

    const addTrack = () => {
        props.onAdd(props.track);
    }

    const removeTrack = () => {
        props.onRemove(props.track);
    }

    const getAlbumCover = () => {
        if (props.track.image) {
            return props.track.image;
        } else {
            return ''
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
            {props.isRemoval ?
                <button className="Track-action" onClick={removeTrack}>-</button> :
                <button className="Track-action" onClick={addTrack}>+</button>
            }
        </div>
    )
}

export default Track;