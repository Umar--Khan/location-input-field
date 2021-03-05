import { useCallback, useEffect, useState, useMemo } from 'react';

import useDebounce from 'hooks/useDebounce';
import Suggestions from 'components/LocationSearchField/Suggestions';
import locationQuery from 'service/locationQuery';
import InputField from 'shared/Fields/Input';
import Spinner from 'shared/LoadingIndicators/Spinner';

const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const { debouncedValue: searchQuery } = useDebounce(searchTerm);

  const isSuggestionsActive = useMemo(
    () => !isSearching && searchQuery.length > 1 && suggestions.length > 0,
    [isSearching, searchQuery, suggestions],
  );

  useEffect(() => {
    if (searchQuery.length > 1) {
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
      setError(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTriggerSearch = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  const renderPickupLocationInputField = useCallback(
    () => (
      <InputField
        name='pick-up-location'
        placeholder='city, airport, station, region, district...'
        aria-label='Pick Up Location'
        value={searchTerm}
        onChange={handleTriggerSearch}
      />
    ),
    [searchTerm],
  );

  return (
    <>
      <label htmlFor='pick-up-location'>Pick-up Location</label>
      <div className='location-input-container'>
        {renderPickupLocationInputField()}
        <Spinner loading={isSearching} />
        <Suggestions
          suggestionsResults={suggestions}
          isActive={isSuggestionsActive}
        />
      </div>
    </>
  );
};

export default SearchField;
