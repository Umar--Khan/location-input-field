import { useEffect, useState } from 'react';

import useDebounce from 'hooks/useDebounce';
import Suggestions from 'components/LocationSearchField/Suggestions';

import locationQuery from 'service/locationQuery';

const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const { debouncedValue: searchQuery } = useDebounce(searchTerm);

  useEffect(() => {
    if (searchQuery) {
      getLocationQuery();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const getLocationQuery = async () => {
    setIsSearching(true);
    try {
      const { data } = await locationQuery(searchQuery);
      setSuggestions(data?.results?.docs);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTriggerSearch = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  return (
    <>
      <h2>Lets find your ideal car</h2>
      <label htmlFor='pick-up-location'>Pick-up Location</label>
      <input
        name='pick-up-location'
        placeholder='city, airport, station, region, district...'
        aria-label='Pick Up Location'
        value={searchTerm}
        onChange={handleTriggerSearch}
      />
      {isSearching && <p>Loading</p>}
      {suggestions.length >= 1 && <Suggestions />}
    </>
  );
};

export default SearchField;
