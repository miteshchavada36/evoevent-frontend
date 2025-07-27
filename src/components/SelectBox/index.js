import React, { forwardRef, useEffect, useState } from 'react';
// import { components } from "react-select";

import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import Select, { components } from 'react-select';
import { Badge, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IconPoint } from '@tabler/icons-react';
// import { Thumbnail } from '../../common/status';

const SelectBox = forwardRef(
  (
    {
      isCreatable,
      isAsync,
      showMessage = false,
      showImage = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const SelectType = isAsync
      ? AsyncSelect
      : isCreatable
      ? CreatableSelect
      : Select;
    const customStyles = {
      option: (provided, state) => {
        return {
          ...provided,
          // ...optionSettings,
          background: state.isSelected
            ? 'var(--tblr-primary)'
            : state.isFocused
            ? 'var(--tblr-gray-100)'
            : '',
          // background:(state.isSelected || state.isFocused) && "var(--tblr-gray-100)",
          // color:"inherit",
          color: state.isDisabled
            ? 'var(--tblr-muted)'
            : state.isSelected
            ? 'var(--tblr-white)'
            : state.isFocused
            ? 'inherit'
            : '',
        };
      },
      valueContainer: (provided, state) => ({
        ...provided,
        // padding:``,
      }),
      control: (provided, state) => {
        let hasError = state.selectProps?.className?.includes('is-invalid');
        return {
          ...provided,
          minHeight: 'unset',
          minHeight: '36px',
          borderRadius: 'var(--tblr-border-radius)',
          boxShadow: `${
            hasError && state.isFocused
              ? '0 0 0 0.25rem rgb(214 57 57 / 25%)'
              : state.isFocused
              ? '0 0 0 0.25rem rgb(47 47 143 / 25%)'
              : ''
          }`,
          borderColor: `${
            hasError
              ? 'var(--tblr-danger)'
              : state.isFocused
              ? '#2f2f8f'
              : 'var(--tblr-border-color)'
          }`,
          '&:hover': {
            borderColor: `${
              hasError
                ? 'var(--tblr-danger)'
                : state.isFocused
                ? '#2f2f8f'
                : 'var(--tblr-border-color)'
            }`,
          },
        };
      },
      dropdownIndicator: (provided, state) => ({
        ...provided,
        padding: '6px',
      }),
      clearIndicator: (provided, state) => ({
        ...provided,
        padding: '6px',
      }),
      multiValue: (styles, { data }) => {
        return {
          ...styles,
          // backgroundColor: "rgba(248,248,251, 1)",
          backgroundColor: '#f8f8fb',
          // borderRadius:'4px',
          border: '1px solid rgba(224,224,224,1)',
          // fontWeight:'var(--tblr-font-weight-medium)',
        };
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        fontSize: '100%',
        // backgroundColor: 'rgba(224,224,224,1)',
        // color: data.color,
      }),
      // multiValueRemove: (styles, { data }) => ({
      //     ...styles,
      //     color: data.color,
      //     ':hover': {
      //         backgroundColor: data.color,
      //         color: 'white',
      //     },
      // })
    };
    const Option = ({ children, ...props }) => {
      const profileImage = props.data?.profile_image
        ? process.env.REACT_APP_UPLOAD_BASE_URL + props.data?.profile_image
        : '';
      return (
        <components.Option {...props}>
          <div className='d-flex'>
            {
              props.data?.profile_image && ''
              // <Thumbnail url={profileImage} title={props.data.label} />
            }
            {children}
          </div>
        </components.Option>
      );
    };
    const ValueContainer = ({ children, ...props }) => {
      return (
        <components.ValueContainer {...props}>
          <div className='d-flex align-items-center'>
            {props.selectProps?.value?.color && (
              <Badge
                bg=''
                className='p-2 me-1'
                style={{
                  background: `${props.selectProps?.value?.color}`,
                }}
              />
            )}
            {children}
          </div>
        </components.ValueContainer>
      );
    };

    const MessageOptions = ({ ...props }) => {
      const { isMobile, mobile, label, isDisabled, message, id } = props.data;
      const [hoveredOption, setHoveredOption] = useState(null);

      // Generate a unique identifier for each option per select instance
      const uniqueOptionId = `${props.selectProps.name}-${id}`;

      return (
        <components.Option {...props}>
          <div
            className='d-flex align-items-center'
            onMouseEnter={() => setHoveredOption(uniqueOptionId)}
            onMouseLeave={() => setHoveredOption(null)}
          >
            {isMobile && (
              <OverlayTrigger
                delay={0}
                placement='top'
                overlay={
                  <Tooltip id={`tooltip-${uniqueOptionId}`}>{mobile}</Tooltip>
                }
                show={hoveredOption === uniqueOptionId} // Show only for the correct option in the correct select
              >
                <span
                  className='text-truncate d-inline-block'
                  style={{
                    maxWidth: '150px',
                    cursor: 'pointer',
                  }}
                ></span>
              </OverlayTrigger>
            )}

            <span className='ms-2'>
              {isMobile !== undefined && (
                <IconPoint
                  className={
                    isMobile ? 'text-success icon' : 'text-danger icon'
                  }
                />
              )}{' '}
              {label}
            </span>

            {isDisabled && (
              <small className='text-warning w-100'> - {message}</small>
            )}
          </div>
        </components.Option>
      );
    };

    const customComponents = showMessage
      ? { Option: MessageOptions }
      : showImage
      ? { Option, ValueContainer }
      : isCreatable
      ? {
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }
      : {};
    return (
      <SelectType
        // components={{ DropdownIndicator, IndicatorSeparator, ...components }}
        // theme={getSelectTheme}
        components={customComponents}
        styles={{
          ...customStyles,
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        menuPosition='fixed'
        isDisabled={disabled}
        ref={ref}
        {...props}
        getOptionLabel={(e) => <div title={e.label}>{`${e.label}`}</div>}
      />
    );
  }
);
export default SelectBox;
