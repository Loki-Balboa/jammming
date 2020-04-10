import React from 'react';
import './SearchResults.css';

import Tracklist from '../Tracklist/Tracklist';
import { ITrack } from '../Track/Track';

interface ISearchResultsProps {
    searchResults: ITrack[];
    onAdd(): void;
    onRemove(): void;
}

const SearchResults: React.FC<ISearchResultsProps> = props => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracklist={props.searchResults}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                isRemoval={false}
            />
        </div>
    );
}

export default SearchResults;