const noResultsMessage = 'No results found';

const Suggestions = ({ suggestionsResults, isActive }) => {
  const renderSuggestionsResults = () =>
    suggestionsResults.map(suggestion => {
      if (suggestion.name === noResultsMessage) {
        return <li key={suggestion.index}>{noResultsMessage}</li>;
      }

      return (
        <li className='suggestions-list-item' key={suggestion.placeKey}>
          <div className='suggestions-list-item--font-emphasized'>
            {suggestion.name}
          </div>
          <div className='suggestions-list-item--font-caption'>
            {suggestion.country}
          </div>
        </li>
      );
    });

  return (
    <div className={`suggestions-list-container${isActive ? ' active' : ''}`}>
      <ul className='suggestions-list'>{renderSuggestionsResults()}</ul>
    </div>
  );
};

export default Suggestions;
