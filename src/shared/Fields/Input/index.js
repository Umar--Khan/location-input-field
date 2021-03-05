const InputField = ({
  onChange,
  name,
  placeholder,
  value,
  className,
  ...rest
}) => (
  <input
    onChange={onChange}
    name={name}
    placeholder={placeholder}
    value={value}
    className={`${className} input-field`}
    {...rest}
  />
);

export default InputField;
