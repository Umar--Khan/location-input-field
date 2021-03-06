import { tags } from 'testUtils/dataTestIds';

const Tag = ({ color, label }) => (
  <div>
    <span className={`tag tag--${color}`} data-testid={tags.tagLabel}>
      {label}
    </span>
  </div>
);

export default Tag;
