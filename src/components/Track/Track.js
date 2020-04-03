import React from 'react';
import './Track';

class Track extends React.Component{
    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>trackname</h3>
                    <p>artist | album</p>
                </div>
                <button className="Track-action">=/-</button>
            </div>
        )
    }
}