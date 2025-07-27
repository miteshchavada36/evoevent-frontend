import SelectBox from "../SelectBox";
export const FilterDropdwon = ({
  name,
  options,
  setFilter,
  className = "",
  ...rest
}) => {
  return (
    <div className="ms-3 d-inline-block mb-1">
      <div className="d-flex align-items-center">
        <SelectBox
          className={`form-select-sm ms-1 ${className}`}
          options={options}
          onChange={(e) => {
            setFilter((prevState) => ({
              ...prevState,
              [name]: e !== null ? e.value : "",
            }));
          }}
          {...rest}
        />
      </div>
    </div>
  );
};
