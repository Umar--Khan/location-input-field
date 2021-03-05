const Container = ({ children }) => (
  <div className='location-page-container'>
    <h1 className='title'>Car Hire - Search, Compare &#38; Save</h1>
    <div className='location-select-container'>{children}</div>
  </div>
);

export default Container;
