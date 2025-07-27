import * as Yup from "yup";
export const REQUIRED_FIELD = Yup.string()
  .trim()
  .nullable()
  .required("This field is required!");
export const ALPHABETIC_REQUIRED_FIELD = Yup.string()
  .trim()
  .nullable()
  .required("This field is required!")
  .matches(/^[a-zA-Z\s]+$/, "Allow only alphabetic characters");
export const EMAIL_FIELD = Yup.string()
  .trim()
  .required("This field is required!")
  .email("Invalid email address!");
export const PHONE_FIELD = Yup.string()
  .transform((value, originalValue) =>
    typeof originalValue === "string" ? originalValue.trim() : null
  )
  .required("This field is required!")
  .matches(/^\d{10}$/, {
    message: "Invalid phone number",
    excludeEmptyString: true,
  });
export const PHOTO_FIELD = Yup.mixed().test(
  "fileType",
  "Only image file are allowed",
  function (value) {
    if (!value || value.length === 0) return true; // Skip validation if no file is provided
    const supportedFormats = ["jpg", "jpeg", "png", "gif"];
    const fileName = value[0].name.toLowerCase();
    const fileExtension = fileName.split(".").pop();
    return value && supportedFormats.includes(fileExtension);
  }
);
export const PASSWORD = Yup.string()
  .trim()
  .required("This field is required!")
  .min(8, "Password must contain 8 characters!")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\])/,
    "Password must contain uppercase, lowercase, special characters, and a numeric value"
  );
export const REQUIRED_SELECTBOX = Yup.object()
  .shape({
    label: Yup.string().trim().required("This field is required!"),
    value: Yup.string().trim().required("This field is required!"),
  })
  .nullable()
  .required("This field is required!");
export const REQUIRED_MULTI_SELECTBOX = Yup.array()
  .of(
    Yup.object().shape({
      label: Yup.string().trim().required("Label is required!"),
      value: Yup.string().trim().required("Value is required!"),
    })
  )
  .min(1, "You must select at least one option!")
  .required("This field is required!");
export const REQUIRED_PRICE_FIELD = Yup.number()
  .nullable()
  .transform((value, originalValue) =>
    originalValue === "" ? undefined : value
  )
  .required("This field is required!")
  .typeError("Invalid price!")
  .positive("Price must be positive!")
  .moreThan(0, "Price must be greater than 0!");
export const REQUIRED_CHECKBOX_FIELD = Yup.array().min(
  1,
  "This field is required!"
);

export const REQUIRED_NUMBER_FIELD = Yup.number()
  .nullable()
  .transform((value, originalValue) =>
    originalValue === "" ? undefined : value
  )
  .required("This field is required!")
  .typeError("Invalid value!")
  .positive("Value must be positive!");

export const REQUIRED_NUMBER_WITH_ZERO_FIELD = Yup.number()
  .nullable()
  .transform((value, originalValue) =>
    originalValue === "" ? undefined : value
  )
  .required("This field is required!")
  .typeError("Invalid value!");

export const ALPHABETIC_FIELD_OPTIONAL = Yup.string()
  .trim()
  .nullable()
  .optional()
  .test("is-alphabetic", "Allow only alphabetic characters", (value) => {
    if (!value) return true; // If the field is empty, it is valid.
    return /^[a-zA-Z\s]+$/.test(value); // Only run the regex if there is a value.
  });
export const EMAIL_FIELD_OPTIONAL = Yup.string()
  .trim()
  .optional()
  .email("Invalid email address!");
export const PHONE_FIELD_OPTIONAL = Yup.string()
  .transform((value, originalValue) =>
    originalValue ? originalValue.trim() : null
  )
  .nullable()
  .optional()
  .matches(/^\d{10}$/, {
    message: "Invalid phone number",
    excludeEmptyString: true,
  });
