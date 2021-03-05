const Spinner = ({ loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  return null;
};

export default Spinner;
