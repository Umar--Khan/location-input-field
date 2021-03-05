import { NO_RESULTS_FOUND } from 'const';
import SuggestionsItem from 'components/LocationSearchField/Suggestions/SuggestionsItem';

const Suggestions = ({ suggestionsResults, isActive }) => {
  const renderSuggestionsResults = () =>
    suggestionsResults.map(suggestion => {
      if (suggestion.name === NO_RESULTS_FOUND) {
        return (
          <li
            className='suggestions-list-item'
            id={`suggestions-list-item${suggestion.index}`}
            key={suggestion.index}
            aria-describedby='pick-up-locations-suggestions-no-results'
          >
            {NO_RESULTS_FOUND}
          </li>
        );
      }

      return (
        <SuggestionsItem suggestion={suggestion} key={suggestion.placeKey} />
      );
    });

  return (
    <div
      className={`suggestions-list-container${isActive ? ' active' : ''}`}
      aria-hidden={!isActive}
    >
      <ul
        className='suggestions-list'
        aria-labelledby='pick-up-locations-suggestions'
        role='listbox'
      >
        {renderSuggestionsResults()}
      </ul>
    </div>
  );
};

export default Suggestions;
