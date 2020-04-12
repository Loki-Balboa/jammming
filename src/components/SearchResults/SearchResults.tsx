import React from 'react';
import './SearchResults.css';

import Tracklist from '../Tracklist/Tracklist';
import { ITrack } from '../Track/Track';

interface ISearchResultsProps {
    searchResults: ITrack[];
    onAdd: (track: ITrack) => void;
}

const SearchResults: React.FC<ISearchResultsProps> = props => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracklist={props.searchResults}
                onAdd={props.onAdd}
                isRemoval={false}
            />
        </div>
    );
}

export default SearchResults;