import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Suggestions from 'components/LocationSearchField/SearchField/Suggestions/index';
import { locationSuggestions } from 'testUtils/mocks';
import { suggestions, tags } from 'testUtils/dataTestIds';
import { NO_RESULTS_FOUND } from 'const';

const suggestionsComponent = (
  <Suggestions suggestionsResults={locationSuggestions} isActive={true} />
);

describe('<Suggestions />', () => {
  it('Render snapshot correctly', () => {
    const component = renderer.create(suggestionsComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Tag label per result', () => {
    const { getAllByTestId } = render(suggestionsComponent);

    const cityTag = getAllByTestId(tags.tagLabel)[0];
    expect(cityTag.textContent).toBe('City');
  });

  it('Amount of results', () => {
    const { getAllByTestId } = render(suggestionsComponent);

    expect(getAllByTestId(suggestions.suggestionItem)).toHaveLength(6);
  });

  it('Correct name and country', () => {
    const { getAllByTestId } = render(suggestionsComponent);

    const suggestionItemName = getAllByTestId(
      suggestions.suggestionItemName,
    )[0];

    const suggestionItemCountry = getAllByTestId(
      suggestions.suggestionItemCountry,
    )[0];

    expect(suggestionItemName.textContent).toBe('Kʼoseva');
    expect(suggestionItemCountry.textContent).toBe('Bulgaria');
  });

  it('Render no results from api', () => {
    const noResultApi = [{ name: NO_RESULTS_FOUND, index: 1 }];

    const { getByTestId } = render(
      <Suggestions suggestionsResults={noResultApi} isActive={true} />,
    );

    expect(getByTestId(suggestions.suggestionItem).textContent).toBe(
      NO_RESULTS_FOUND,
    );
  });
});
