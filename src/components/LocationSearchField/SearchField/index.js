import { useCallback, useEffect, useState, useMemo } from 'react';

import useDebounce from 'hooks/useDebounce';
import Suggestions from 'components/LocationSearchField/Suggestions';
import locationQuery from 'service/locationQuery';
import InputField from 'shared/Fields/Input';

const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const { debouncedValue: searchQuery } = useDebounce(searchTerm);

  const isSuggestionsActive = useMemo(
    () =>
      !isSearching &&
      !error &&
      searchQuery.length > 1 &&
      suggestions.length > 0,
    [isSearching, searchQuery, suggestions, error],
  );

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

  useEffect(() => {
    if (searchQuery.length > 1) {
      getLocationQuery();
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line
  }, [searchQuery]);

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
        autoComplete='off'
        aria-invalid='false'
      />
    ),
    [searchTerm],
  );

  return (
    <div className='location-input'>
      <label htmlFor='pick-up-location' className='location-input__label'>
        Pick-up Location
      </label>
      <div className='location-input__container'>
        {renderPickupLocationInputField()}
        <Suggestions
          suggestionsResults={suggestions}
          isActive={isSuggestionsActive}
        />
      </div>
    </div>
  );
};

export default SearchField;
