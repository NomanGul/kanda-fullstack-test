import { useReducer } from "react";
import * as Yup from "yup";

const reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        formData: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: action.payload,
      };
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const useForm = (schema, defaultFormValues = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    formData: defaultFormValues,
    errors: {},
  });
  const { formData, errors } = state;

  const validate = async () => {
    const validationResult = { isValid: true, errors: {} };
    try {
      await schema().validate(formData, {
        strict: true,
        abortEarly: false,
        stripUnknown: false,
      });
      dispatch({ type: "RESET", payload: defaultFormValues });
    } catch (e) {
      const formValidationError = {};
      if (e instanceof Yup.ValidationError) {
        for (const error of e.inner) {
          // Only show the first error of the field
          if (!formValidationError[error.path]) {
            formValidationError[error.path] = error.message;
          }
        }
      }
      dispatch({ type: "SET_ERROR", payload: formValidationError });
      validationResult.isValid = false;
      validationResult.errors = formValidationError;
      return validationResult;
    }

    return validationResult;
  };

  const setValue = (event) => {
    const { name, value } = event.target;
    updateFormValue(name, value);
  };

  // Commit state result
  const dispatchValue = (field, value, result) => {
    if (result instanceof Yup.ValidationError) {
      // Error
      errors[field] = result.message;
    } else {
      // Delete current state result
      delete errors[field];
    }

    // Update state, for object update, need a clone
    const newState = {
      errors,
      formData: { ...formData, [field]: value },
    };
    dispatch({ type: "ON_CHANGE", payload: newState });
  };

  const updateFormValue = (field, value) => {
    // Validate the field, then before catch, if catch before then, both will be triggered
    Yup.reach(schema(), field)
      .validate(value)
      .then((result) => {
        dispatchValue(field, value, result);
      })
      .catch((result) => {
        dispatchValue(field, value, result);
      });
  };

  const onFormBlur = (event) => {
    const { name, value } = event.target;
    updateFormValue(name, value);
  };

  return {
    validate,
    setValue,
    errors: (field) => errors[field],
    getValues: () => formData,
    value: (field) => state[field],
    onFormBlur,
  };
};
