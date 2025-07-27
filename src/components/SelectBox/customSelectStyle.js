export const SELECT_SM_STYLE = {
  container: (provided, state) => ({
    ...provided,
    padding: '0',
    border: '0',
  }),
  option: (provided, state) => {
    return {
      ...provided,
      background: state.isSelected
        ? 'var(--tblr-primary)'
        : state.isFocused
          ? 'var(--tblr-gray-100)'
          : '',
      color: state.isSelected
        ? 'var(--tblr-white)'
        : state.isFocused
          ? 'inherit'
          : '',
    };
  },
  control: (provided, state) => {
    return {
      ...provided,
      minWidth: `100px`,
      minHeight: 'calc(1.5em + 0.5rem + 2px)',
      height: 'calc(1.5em + 0.5rem + 2px)',
      borderRadius: '2px',
      borderColor:
        state.isFocused || state.hasValue
          ? '#90b5e2'
          : 'var(--tblr-border-color)',
      boxShadow: state.isFocused ? '0 0 0 0.25rem rgb(42 106 115 / 25%)' : '',
      boxShadow: 'none',
      ':hover': {
        borderColor:
          state.isFocused || state.hasValue
            ? '#90b5e2'
            : 'var(--tblr-border-color)',
      },
    };
  },
  valueContainer: (provided, state) => ({
    ...provided,
    marginTop: '0',
    marginLeft: '6px',
    padding: '0',
    border: '0',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    marginTop: '0',
    padding: '0',
    border: '0',
    width: '16px',
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    marginTop: '0',
    padding: '0',
    border: '0',
    width: '16px',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    paddingRight: '4px',
    border: '0',
  }),
};
