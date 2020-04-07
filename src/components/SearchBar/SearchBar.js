import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = props => {

    const [term, setTerm] = useState();

    const search = () => {
        props.onSearch(term);
    }

    const handleTermChange = e => {
        setTerm(e.target.value);
    }

    const handleKeyPress = e => {
        const enterCode = 13;
        if (e.which === enterCode) {
            props.onSearch(term);
        }
    }

    return (
        <div className="SearchBar">
            <input
                placeholder="Enter A Song, Album or Artist"
                onChange={handleTermChange}
                onKeyPress={handleKeyPress}
            />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );
}

export default SearchBar;