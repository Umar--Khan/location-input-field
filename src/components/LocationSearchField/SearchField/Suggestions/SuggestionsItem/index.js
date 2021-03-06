import { PLACE_TYPES_LABELS, PLACE_TYPES_COLORS } from 'const';
import Tag from 'shared/Tag';
import { suggestions } from 'testUtils/dataTestIds';

const renderTag = placeType => {
  const label = PLACE_TYPES_LABELS[placeType];
  const color = PLACE_TYPES_COLORS[placeType];

  return <Tag color={color} label={label} />;
};

const SuggestionsItem = ({ suggestion }) => (
  <li
    className='suggestions-list-item'
    key={suggestion.placeKey}
    id={`suggestions-list-item-${suggestion.index}`}
    role='option'
    aria-selected='false'
    data-testid={suggestions.suggestionItem}
  >
    {renderTag(suggestion.placeType)}
    <div className='suggestions-list-item__content'>
      <p
        className='suggestions-list-item--font-emphasized'
        data-testid={suggestions.suggestionItemName}
      >
        {suggestion.name}
      </p>
      <p
        className='suggestions-list-item--font-caption'
        data-testid={suggestions.suggestionItemCountry}
      >
        {suggestion.country}
      </p>
    </div>
  </li>
);

export default SuggestionsItem;
