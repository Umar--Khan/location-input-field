import { PLACE_TYPES_LABELS, PLACE_TYPES_COLORS } from 'const';
import Tag from 'shared/Tag';

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
  >
    {renderTag(suggestion.placeType)}
    <div className='suggestions-list-item__content'>
      <p className='suggestions-list-item--font-emphasized'>
        {suggestion.name}
      </p>
      <p className='suggestions-list-item--font-caption'>
        {suggestion.country}
      </p>
    </div>
  </li>
);

export default SuggestionsItem;
