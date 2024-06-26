import { useState, useRef } from "react"

function SearchBar( { onSearch } ) {

    const [city, setCity] = useState('')

    const inputRef = useRef(null);

    const handleSearch = () => {
        onSearch(city)
        setCity('');
        inputRef.current.focus();
    }

    return (
        <div>
            <input 
                ref={inputRef}
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />

            <button onClick={handleSearch}> Search </button>
        </div>
    )
}

export default SearchBar