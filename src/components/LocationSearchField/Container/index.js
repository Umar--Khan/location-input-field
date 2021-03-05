const Container = ({ children }) => (
  <main className='location-page-container'>
    <div className='location-page-container__wrapper'>
      <h1 className='location-page-container__title'>
        Car Hire - Search, Compare &#38; Save
      </h1>
      <div className='location-select-container'>
        <h2 className='location-select-container__title'>
          Lets find your ideal car
        </h2>
        {children}
      </div>
    </div>
  </main>
);

export default Container;
