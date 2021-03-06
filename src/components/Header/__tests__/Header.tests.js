import renderer from 'react-test-renderer';

import Header from 'components/Header';

describe('<Header />', () => {
  it('Render snapshot correctly', () => {
    const component = renderer.create(<Header />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
