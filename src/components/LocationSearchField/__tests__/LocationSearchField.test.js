import renderer from 'react-test-renderer';
import LocationSearchField from 'components/LocationSearchField';

describe('<LocationSearchField />', () => {
  it('Render snapshot correctly', () => {
    const component = renderer.create(<LocationSearchField />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
