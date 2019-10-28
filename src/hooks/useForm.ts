import { useState, useEffect, useCallback } from "react";
import { objectCast } from "../utils/objectCast";
import { capitalize } from "../utils/capitalize";

const getPropValues = (stateSchema: object, prop: any) => {
  return Object.keys(stateSchema).reduce((accumulator, curr) => {
    objectCast(accumulator)[curr] = objectCast(stateSchema)[curr][prop];

    return accumulator;
  }, {});
};

const isRequiredField = (value: string, isRequired: boolean, name: string) => {
  if (!value && isRequired) return `${capitalize(name)} is required`;
  return "";
};

const useForm = (
  stateSchema = {},
  stateValidatorSchema = {},
  submitFormCallback: (values: object) => void
) => {
  const [state, setStateSchema] = useState(stateSchema);

  const [values, setValues] = useState(getPropValues(state, "value"));
  const [errors, setErrors] = useState(getPropValues(state, "error"));

  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setStateSchema(stateSchema);
    setDisable(true);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isDirty) {
      setDisable(validateErrorState());
    }
  }, [errors, isDirty]); // eslint-disable-line

  const validateErrorState = useCallback(() => {
    return Object.values(errors).some(error => error);
  }, [errors]);

  // event handler for  changes in input
  const handleOnChange = useCallback(
    (event?, conditionalChild?, birthdayDate?) => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;
      const validator = stateValidatorSchema;

      if (
        event.target.classList[0] === "dp-day" ||
        event.target.classList[0] === "dp-remove"
      ) {
        if (event.target.classList[0] === "dp-day") {
          setValues(prevState => ({
            ...prevState,
            birthday: birthdayDate
          }));
        } else {
          setValues(prevState => ({
            ...prevState,
            birthday: ""
          }));
        }
      }

      if (!objectCast(validator)[name]) return;

      const field = objectCast(validator)[name];

      let error = "";
      error = isRequiredField(value, field.required, name);

      if (error === "" && field["validator"]) {
        const fieldValidator = field["validator"];

        // using provided validation func
        const testFunc = fieldValidator["func"];
        if (!testFunc(value, values)) {
          error = fieldValidator["error"];
        }
      }

      if (conditionalChild) {
        setValues(prevState => ({ ...prevState, [conditionalChild]: "" }));
        setErrors(prevState => ({
          ...prevState,
          [conditionalChild]: undefined
        }));
      }

      setValues(prevState => ({ ...prevState, [name]: value }));
      setErrors(prevState => ({ ...prevState, [name]: error }));
    },
    [stateValidatorSchema, values]
  );

  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault();

      for (let key in stateValidatorSchema) {
        if (stateValidatorSchema.hasOwnProperty(key)) {
          const field = objectCast(stateValidatorSchema)[key];
          const value = objectCast(values)[key];

          let error = "";
          error = isRequiredField(value, field.required, key);

          if (error === "" && field["validator"]) {
            const fieldValidator = field["validator"];

            const testFunc = fieldValidator["func"];
            if (!testFunc(value, values)) {
              error = fieldValidator["error"];
            }
          }

          setValues(prevState => ({ ...prevState, [key]: value }));
          setErrors(prevState => ({ ...prevState, [key]: error }));
        }
      }

      // double checking inputs for errors
      if (!validateErrorState()) {
        submitFormCallback(values);
      }
    },
    [stateValidatorSchema, submitFormCallback, validateErrorState, values]
  );

  return {
    handleOnChange,
    handleOnSubmit,
    values,
    errors,
    disable,
    setValues,
    setErrors
  };
};

export default useForm;
