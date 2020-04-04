import React from 'react';
import './SearchResults.css';

import Tracklist from '../Tracklist/Tracklist';

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist tracklist={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    isRemoval={false}
                />
            </div>
        );
    }
}

export default SearchResults;