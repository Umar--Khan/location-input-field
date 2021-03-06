import LocationSearchField from 'components/LocationSearchField';
import Header from 'components/Header';
import { app } from 'testUtils/dataTestIds';

const App = () => (
  <div className='App' data-testid={app.appContainer}>
    <Header />
    <LocationSearchField />
  </div>
);

export default App;
