import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useEffect, useState, useCallback } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import SelectBox from "../SelectBox";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";
export const FormField = ({
  label,
  name,
  type,
  register = () => {},
  error = "",
  placeholder = "",
  size = "12",
  hint = "",
  autoFocus,
  required,
  downloadLink = false,
  downloadLinkLeft = false,
  isDecimal = true,
  isLabel = true,
  xs = 12,
  ...props
}) => {
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.target.type === "number") {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  const handleKeyDown = (e) => {
    // Check if the key pressed is "e" or "E"
    if (type === "number" && (e.key === "e" || e.key === "E")) {
      e.preventDefault();
    }
    if (type === "number" && !isDecimal && e.key === ".") {
      e.preventDefault();
    }
    if (type === "number" && isDecimal && e.key.match(/[0-9]/)) {
      const decimalIndex = e.target.value.indexOf(".");
      if (decimalIndex !== -1 && e.target.value.slice(decimalIndex + 1).length >= 2) {
        e.preventDefault();
      }
    }
  };

  return (
    <Form.Group as={Col} {...(size > 0 ? { lg: size, xs: xs } : {})}>
      {isLabel && (
        <Form.Label className={`${required ? "required" : ""}`}>
          {label}{" "}
          <Form.Text className="form-label-description" muted>
            {hint}
          </Form.Text>
        </Form.Label>
      )}
      <Form.Control
        type={type}
        onKeyDown={handleKeyDown}
        isInvalid={error ? true : false}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...register(name)}
        {...props}
      />
      {downloadLink && (
        <Form.Text as="div" className={`text-truncate text-break text-${downloadLinkLeft ? "start" : "end"}`}>
          {downloadLink}
        </Form.Text>
      )}
      <Form.Control.Feedback type="invalid" className="lh-sm">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const FormFieldPassword = ({
  label,
  name,
  type,
  register,
  error = "",
  placeholder = "",
  size = "6",
  hint = "",
  autoFocus,
  required,
  downloadLink = false,
  ...props
}) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <Form.Group as={Col} lg={size}>
      <Form.Label className={`${required ? "required" : ""}`}>
        {label}{" "}
        <Form.Text className="form-label-description" muted>
          {hint}
        </Form.Text>
      </Form.Label>
      <InputGroup className={`input-group-flat ${error ? "is-invalid" : ""}`}>
        <Form.Control
          type={`${isShow ? "password" : "text"}`}
          isInvalid={error ? true : false}
          placeholder={placeholder}
          {...register(name)}
          autoFocus={autoFocus}
          {...props}
        />
        <InputGroup.Text as="span" className={`${error && "border-danger"}`}>
          <Link to={""} tabIndex="-1" className={`${error && "text-danger"}`} onClick={() => setIsShow(!isShow)}>
            {isShow ? <IconEye stroke={1.5} size={20} /> : <IconEyeOff stroke={1.5} size={20} />}
          </Link>
        </InputGroup.Text>
      </InputGroup>
      {downloadLink && (
        <Form.Text as="div" className="text-truncate text-break text-end">
          {downloadLink}
        </Form.Text>
      )}
      <Form.Control.Feedback type="invalid" className="lh-sm">
        {error.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
export const FormFieldSelect = ({
  size = "12",
  label,
  name,
  placeholder = "Select",
  control,
  options = [],
  error = "",
  isClearable = false,
  isSearchable = false,
  required,
  isLabel = true,
  isTransparent = false,
  xs = undefined,
  onChange,
  disabled,
  value,
  ...props
}) => {
  return (
    <Col bsPrefix={`col-${size} mb-3 mt-3`} xs={xs}>
      <Form.Group>
        {isLabel && <Form.Label className={`${required ? "required" : ""}`}>{label}</Form.Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
              isClearable={isClearable}
              isSearchable={isSearchable}
              options={options}
              className={`p-0 border-0 card ${!isTransparent ? "form-control" : "transparent-select"} ${error ? "is-invalid" : ""}`}
              placeholder={placeholder}
              isTransparent={isTransparent}
              onChange={(selectedOption) => {
                field.onChange(selectedOption); // Maintain form state
                if (onChange) {
                  onChange(selectedOption, name); // Call custom onChange
                }
              }}
              disabled={disabled}
              value={value} 
              {...props}
            />
          )}
        />
        <Form.Control.Feedback type="invalid" className="lh-sm">
          {error.message}
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
};
export const FormFieldDatePicker = ({
  label,
  name,
  control,
  error = "",
  placeholder = "",
  size = "6",
  hint = "",
  autoFocus,
  required,
  isLabel = true,
  excludeDates = [],
  onChange,
  ...props
}) => {
  const fieldName = name; // Store the field name as a separate variable

  return (
    <Form.Group as={Col} md={size} className="mt-3">
      {isLabel && (
        <Form.Label className={`${required ? "required" : ""}`}>
          {label}{" "}
          <Form.Text className="form-label-description" muted>
            {hint}
          </Form.Text>
        </Form.Label>
      )}
      <Controller
        control={control}
        name={fieldName}
        defaultValue={null}
        render={({ field }) => (
          <ReactDatePicker
            wrapperClassName="w-100"
            selected={field.value}
            onChange={(date) => {
              field.onChange(date);
              if (onChange) {
                onChange(date, name); // Call custom onChange
              }
            }}
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholderText={placeholder}
            autoFocus={autoFocus}
            dateFormat="yyyy-MM-dd"
            fixedHeight
            excludeDates={excludeDates} // Disable already selected dates
            portalId="root" // Ensures it's rendered outside table
            popperPlacement="bottom-end"
            popperClassName="custom-datepicker-popper" // Custom styling
            {...props}
          />
        )}
      />
      {error && <Form.Text className="text-danger">{error.message}</Form.Text>}
    </Form.Group>
  );
};
export const FormFieldCheck = ({
  size = "6",
  label = "",
  name,
  type = "radio",
  options,
  register,
  error = "",
  inline = true,
  required,
  className = "",
  checkClass = "",
  checkBoxClass = "",
  isLabel = true,
  isShowError = true,
  ...props
}) => {
  return (
    <Form.Group as={Col} xs={size} className={className}>
      {isLabel && <Form.Label className={`${required && "required"}`}>{label}</Form.Label>}
      {options.map((option, i) => (
        <Form.Check
          inline={inline}
          key={option.value || option.label}
          type={type}
          className={`mt-2 ${checkClass} ${error ? "is-invalid" : ""} ${i === options.length - 1 ? "me-0" : ""}`}
        >
          <Form.Check.Input
            type={type}
            {...register(name)}
            className={checkBoxClass}
            value={option.value}
            isInvalid={error ? true : false}
            id={`${name}-${option.value}`}
            {...props}
          />
          <Form.Check.Label htmlFor={`${name}-${option.value}`}>{option.label} </Form.Check.Label>
        </Form.Check>
      ))}
      {isShowError && (
        <Form.Control.Feedback type="invalid" className="lh-sm">
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
export const FormFieldTextArea = ({
  size = "6",
  label,
  name,
  placeholder = "Description",
  control,
  register,
  autoFocus,
  error = "",
  required,
  isLabel = true,
  isTransparent = false,
  xs = undefined,
  onChange,
  disabled,
  ...props
}) => {

  return (
    <Col bsPrefix={`col-${size}`} xs={xs}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className={`${required ? "required" : ""}`}>{label}</Form.Label>
        <Form.Control
          isInvalid={error ? true : false}
          {...register(name)}
          as="textarea"
          rows={3}
          placeholder={placeholder}
          autoFocus={autoFocus}
          {...props}
        />
      </Form.Group>
      <div style={{ marginTop: "-15px", fontSize: "12px" }} className="text-danger">
        {error.message}
      </div>
    </Col>
  );
};
export const FormFieldDropzone = ({
  label = "Upload Image",
  name,
  control,
  error = "",
  size = 12,
  xs = 12,
  required,
  isLabel = true,
  acceptedTypes = { "image/*": [".jpeg", ".jpg", ".png"] },
  onDropFile = () => {},
  previewUrl,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onDropFile(acceptedFiles[0]); // Pass file to parent or form handler
    }
  }, [onDropFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    multiple: false,
  });

  return (
    <Form.Group as={Col} lg={size} xs={xs} className="mb-3">
      {isLabel && (
        <Form.Label className={`${required ? "required" : ""}`}>
          {label}
        </Form.Label>
      )}

      <div
        {...getRootProps()}
        className={`dropzone-wrapper border rounded d-flex flex-column justify-content-center align-items-center text-center p-4 ${
          error ? "border-danger" : "border-secondary"
        }`}
        style={{ cursor: "pointer", minHeight: "180px", background: "#fafafa" }}
      >
        <input {...getInputProps()} name={name} />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            style={{ maxHeight: "120px", maxWidth: "100%", objectFit: "contain" }}
          />
        ) : (
          <>
            <div>
              <i className="bi bi-cloud-upload" style={{ fontSize: "2rem", color: "#999" }}></i>
            </div>
            <p className="mb-0">
              {isDragActive
                ? "Drop the image here ..."
                : "Drop an image here or click to upload !"}
            </p>
          </>
        )}
      </div>

      {error && (
        <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
          {error.message}
        </Form.Text>
      )}
    </Form.Group>
  );
};
