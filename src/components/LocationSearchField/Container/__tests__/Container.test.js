import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Container from 'components/LocationSearchField/Container';
import { page } from 'testUtils/dataTestIds';

const component = <Container>Content</Container>;

describe('<Container />', () => {
  it('Render snapshot correctly', () => {
    const component = renderer.create(<Container />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Render correct page title', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(page.pageTitle).textContent).toBe(
      'Car Hire - Search, Compare & Save',
    );
  });

  it('Render correct location search field title', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(page.locationSearchFieldTitle).textContent).toBe(
      'Lets find your ideal car',
    );
  });

  it('Render children', () => {
    const { getByText } = render(component);

    expect(getByText('Content')).toBeInTheDocument();
  });
});
