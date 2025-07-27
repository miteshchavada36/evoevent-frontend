import React, { useState } from "react";
import {
  FormField,
  FormFieldSelect,
  FormFieldDatePicker,
  FormFieldDropzone,
} from "../components/Form/FormField";
import { Row } from "react-bootstrap";
import { Controller } from "react-hook-form";

const AddEventModal = ({
  register,
  control,
  errors,
  categories,
  setValue,
  watch,
  isOpen,
  onClose,
}) => {
  const imagePath = watch('image_path');
  const isFile = typeof imagePath === 'object'; // if uploading new file
  const [preview, setPreview] = useState(null); // ✅ Added useState
  const transformedCategories = categories.map((item) => {
    return {
      value: item.value,
      label: item.label,
    };
  });

  return (
    <>
      <Row>
        <Controller
          control={control}
          name="image_path"
          render={({ field }) => (
            <FormFieldDropzone
              name="image_path"
              label="Event Image"
              required
              onDropFile={(file) => {
                setValue("image_path", file);
                setPreview(URL.createObjectURL(file)); // ✅ Works now
              }}
              previewUrl={preview}
            />
          )}
        />
        {/* 👇 Preview existing image */}
        {imagePath && !isFile && (
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/storage/${imagePath}`}
            alt="Event"
            className="mt-2"
            style={{ maxHeight: "150px", objectFit: "cover" }}
          />
        )}
      </Row>

      <Row>
        <FormField
          label="Event Name"
          name="name"
          register={register}
          error={errors?.name}
          placeholder="Ex. John's birthday"
          required
        />
      </Row>

      <Row>
        <Controller
          control={control}
          name="event_date"
          render={({ field }) => (
            <FormFieldDatePicker
              label="Event Date"
              name="event_date"
              control={control}
              error={errors?.event_date}
              placeholder="Select a date"
              required
              size="12"
            />
          )}
        />
      </Row>

      <Row>
        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <FormFieldSelect
              label="Category"
              name="category_id"
              control={control}
              options={transformedCategories}
              error={errors?.category_id}
              value={
                transformedCategories.find(
                  (option) => option.value === field.value
                ) || null
              }
              onChange={(selected) => field.onChange(selected?.value)}
              placeholder="Select an option..."
              required
              size="12"
            />
          )}
        />
      </Row>
    </>
  );
};

export default AddEventModal;
