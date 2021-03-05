const Tag = ({ color, label }) => (
  <div>
    <span className={`tag tag--${color}`}>{label}</span>
  </div>
);

export default Tag;
