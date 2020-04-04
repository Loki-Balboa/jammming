import React from 'react';
import './Tracklist.css';

import Track from '../Track/Track';

const Tracklist = props => {

        return (
            <div className="Tracklist  ">
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
        )
}

export default Tracklist;