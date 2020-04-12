import React from 'react';
import './Tracklist.css';

import Track, { ITrack } from '../Track/Track';

interface ITracklistProps {
    tracklist: ITrack[];
    onAdd?: (track: ITrack) => void;
    onRemove?: (track: ITrack) => void;
    isRemoval: boolean;
}

const Tracklist: React.FC<ITracklistProps> = props => {

    return (
        <div className="Tracklist">
            {props.tracklist.map(track => {
                return (
                    <Track
                        key={track.id}
                        track={track}
                        onAdd={props.onAdd}
                        onRemove={props.onRemove}
                        isRemoval={props.isRemoval}
                    />
                );
            })}
        </div>
    );
}

export default Tracklist;