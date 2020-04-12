import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import './SearchBar.css';

interface SearchBarProps {

}

const SearchBar: React.FC<{ onSearch: (term: string) => void }> = props => {

    const [term, setTerm] = useState<string>('');

    const search = () => {
        props.onSearch(term);
    }

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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