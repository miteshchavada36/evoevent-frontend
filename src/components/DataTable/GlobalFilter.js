import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
const GlobalFilter = ({ globalFilter, setGlobalFilter, placeholder }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);
  return (
    <input
      type='text'
      className='form-control'
      // style={{ minWidth: '250px' }}
      aria-label='Search'
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};
export default GlobalFilter;
