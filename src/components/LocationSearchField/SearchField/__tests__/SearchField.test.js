import renderer from 'react-test-renderer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SearchField from 'components/LocationSearchField/SearchField';
import { searchField, suggestions } from 'testUtils/dataTestIds';
import { locationQueryApi } from 'const/locationQueryApi';
import { locationSuggestions } from 'testUtils/mocks';

const mockAxios = new MockAdapter(axios);

describe('<SearchField />', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('Render snapshot correctly', () => {
    const component = renderer.create(<SearchField />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Input Field', () => {
    const { getByTestId } = render(<SearchField />);

    const inputField = getByTestId(searchField.inputField);
    const inputFieldLabel = getByTestId(searchField.inputFieldLabel);

    expect(inputField).toBeInTheDocument();
    expect(inputFieldLabel.textContent).toBe('Pick-up Location');
  });

  it('Suggestions should not be active in beginning', () => {
    const { getByTestId } = render(<SearchField />);

    const suggestionsContainerClass = getByTestId(suggestions.container)
      .className;

    expect(suggestionsContainerClass).not.toContain('active');
  });

  it('Change in input field should fire a fetch of suggestions', async () => {
    const { getByTestId, getAllByTestId } = render(<SearchField />);

    const inputField = getByTestId(searchField.inputField);

    const query = 'birmingham';

    fireEvent.change(inputField, {
      target: { value: query },
    });

    mockAxios
      .onGet(locationQueryApi(query))
      .reply(200, { results: { docs: locationSuggestions } });

    await waitFor(() => {
      expect(getAllByTestId(suggestions.suggestionItem)).toHaveLength(6);
      expect(getByTestId(suggestions.container).className).toContain('active');
    });
  });

  it('No suggestions if there is an error from API', async () => {
    const { getByTestId, queryByTestId } = render(<SearchField />);

    const inputField = getByTestId(searchField.inputField);

    const query = 'birmingham';

    fireEvent.change(inputField, {
      target: { value: query },
    });

    mockAxios.onGet(locationQueryApi(query)).networkErrorOnce();

    await waitFor(() => {
      expect(queryByTestId(suggestions.suggestionItem)).not.toBeInTheDocument();
      expect(getByTestId(suggestions.container).className).not.toContain(
        'active',
      );
    });
  });
});
