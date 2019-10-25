import { useState, useEffect, useCallback } from "react";
import { objectCast } from "../utils/objectCast";

/**
 * Determines a value if it's an object
 *
 * @param {object} value
 */
// function isObject(value: object) {
//   return value !== null && typeof value === "object";
// }

function getPropValues(stateSchema: object, prop: any) {
  // if (!isObject(stateSchema) || !prop) {
  //   throw new Error("Invalid Parameter passed.");
  // }

  return Object.keys(stateSchema).reduce((accumulator, curr) => {
    objectCast(accumulator)[curr] = objectCast(stateSchema)[curr][prop];

    return accumulator;
  }, {});
}

/**
 *
 * @param {string} value
 * @param {boolean} isRequired
 */
function isRequiredField(value: string, isRequired: boolean) {
  if (!value && isRequired) return "This field is required";
  return "";
}

/**
 * Custom hooks to validate your Form...
 *
 * @param {object} stateSchema model you stateSchema.
 * @param {object} stateValidatorSchema model your validation.
 * @param {function} submitFormCallback function to be execute during form submission.
 */
function useForm(
  stateSchema = {},
  stateValidatorSchema = {},
  submitFormCallback: (values: object) => void
) {
  const [state, setStateSchema] = useState(stateSchema);

  const [values, setValues] = useState(getPropValues(state, "value"));
  const [errors, setErrors] = useState(getPropValues(state, "error"));

  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // Get a local copy of stateSchema
  useEffect(() => {
    setStateSchema(stateSchema);
    setDisable(true); // Disable button in initial render.
  }, []); // eslint-disable-line

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateErrorState());
    }
  }, [errors, isDirty]); // eslint-disable-line

  // Used to disable submit button if there's a value in errors
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component

  const validateErrorState = useCallback(() => {
    return Object.values(errors).some(error => error);
  }, [errors]);

  // Event handler for handling changes in input.
  const handleOnChange = useCallback(
    (event?, conditionalChild?) => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;
      const _validator = stateValidatorSchema;

      if (!objectCast(_validator)[name]) return;

      const _field = objectCast(_validator)[name];

      let error = "";
      error = isRequiredField(value, _field.required);

      // Prevent running this function if the value is required field
      if (error === "" && _field["validator"]) {
        // if (error === "" && isObject(_field["validator"])) {
        const _fieldValidator = _field["validator"];

        // Test the function callback if the value is meet the criteria
        const testFunc = _fieldValidator["func"];
        if (!testFunc(value, values)) {
          error = _fieldValidator["error"];
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
      // stateValidatorSchema.

      for (let key in stateValidatorSchema) {
        if (stateValidatorSchema.hasOwnProperty(key)) {
          // const _validator = key
          const _field = objectCast(stateValidatorSchema)[key];
          const value = objectCast(values)[key];

          let error = "";
          error = isRequiredField(value, _field.required);

          // Prevent running this function if the value is required field
          if (error === "" && _field["validator"]) {
            // if (error === "" && isObject(_field["validator"])) {
            const _fieldValidator = _field["validator"];

            // Test the function callback if the value is meet the criteria
            const testFunc = _fieldValidator["func"];
            if (!testFunc(value, values)) {
              error = _fieldValidator["error"];
            }
          }

          setValues(prevState => ({ ...prevState, [key]: value }));
          setErrors(prevState => ({ ...prevState, [key]: error }));
        }
      }
      // Making sure that there's no error in the state
      // before calling the submit callback function
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
}

export default useForm;

// import { useState, useEffect, useCallback } from "react";

// const VALUE = "value";
// const ERROR = "error";

// const REQUIRED_FIELD_ERROR = "This field is required";

// /**
//  * Determines a value if it's an object
//  *
//  * @param {object} value
//  */
// function isObject(value) {
//   return value !== null && typeof value === "object";
// }

// function getPropValues(stateSchema, prop) {
//   if (!isObject(stateSchema) || !prop) {
//     throw new Error("Invalid Parameter passed.");
//   }

//   return Object.keys(stateSchema).reduce((accumulator, curr) => {
//     accumulator[curr] = stateSchema[curr][prop];

//     return accumulator;
//   }, {});
// }

// /**
//  *
//  * @param {string} value
//  * @param {boolean} isRequired
//  */
// function isRequiredField(value, isRequired) {
//   if (!value && isRequired) return REQUIRED_FIELD_ERROR;
//   return "";
// }

// /**
//  * Custom hooks to validate your Form...
//  *
//  * @param {object} stateSchema model you stateSchema.
//  * @param {object} stateValidatorSchema model your validation.
//  * @param {function} submitFormCallback function to be execute during form submission.
//  */
// function useForm(
//   stateSchema = {},
//   stateValidatorSchema = {},
//   submitFormCallback
// ) {
//   const [state, setStateSchema] = useState(stateSchema);

//   const [values, setValues] = useState(getPropValues(state, VALUE));
//   const [errors, setErrors] = useState(getPropValues(state, ERROR));

//   const [disable, setDisable] = useState(true);
//   const [isDirty, setIsDirty] = useState(false);

//   // Get a local copy of stateSchema
//   useEffect(() => {
//     setStateSchema(stateSchema);
//     setDisable(true); // Disable button in initial render.
//   }, []); // eslint-disable-line

//   // For every changed in our state this will be fired
//   // To be able to disable the button
//   useEffect(() => {
//     if (isDirty) {
//       setDisable(validateErrorState());
//     }
//   }, [errors, isDirty]); // eslint-disable-line

//   // Used to disable submit button if there's a value in errors
//   // or the required field in state has no value.
//   // Wrapped in useCallback to cached the function to avoid intensive memory leaked
//   // in every re-render in component

//   const validateErrorState = useCallback(() => {
//     // let missingRequiredValues = false;
//     // Object.keys(stateValidatorSchema).map(key => {
//     //   if (stateValidatorSchema[key].required && values[key].length === 0) {
//     //     // console.log("something missing");
//     //     missingRequiredValues = true;
//     //   }
//     // });
//     return Object.values(errors).some(error => error);
//   }, [errors]);

//   // Event handler for handling changes in input.
//   const handleOnChange = useCallback(
//     (event, conditionalChild) => {
//       setIsDirty(true);

//       const name = event.target.name;
//       const value = event.target.value;
//       const _validator = stateValidatorSchema;

//       if (!_validator[name]) return;

//       const _field = _validator[name];

//       let error = "";
//       error = isRequiredField(value, _field.required);

//       // Prevent running this function if the value is required field
//       if (error === "" && isObject(_field["validator"])) {
//         const _fieldValidator = _field["validator"];

//         // Test the function callback if the value is meet the criteria
//         const testFunc = _fieldValidator["func"];
//         if (!testFunc(value, values)) {
//           error = _fieldValidator["error"];
//         }
//       }

//       if (conditionalChild) {
//         setValues(prevState => ({ ...prevState, [conditionalChild]: "" }));
//         setErrors(prevState => ({
//           ...prevState,
//           [conditionalChild]: undefined
//         }));
//       }

//       setValues(prevState => ({ ...prevState, [name]: value }));
//       setErrors(prevState => ({ ...prevState, [name]: error }));
//     },
//     [stateValidatorSchema, values]
//   );

//   const handleOnSubmit = useCallback(
//     event => {
//       event.preventDefault();
//       // stateValidatorSchema.

//       for (let key in stateValidatorSchema) {
//         if (stateValidatorSchema.hasOwnProperty(key)) {
//           // const _validator = key
//           const _field = stateValidatorSchema[key];
//           const value = values[key];

//           let error = "";
//           error = isRequiredField(value, _field.required);

//           // Prevent running this function if the value is required field
//           if (error === "" && isObject(_field["validator"])) {
//             const _fieldValidator = _field["validator"];

//             // Test the function callback if the value is meet the criteria
//             const testFunc = _fieldValidator["func"];
//             if (!testFunc(value, values)) {
//               error = _fieldValidator["error"];
//             }
//           }

//           setValues(prevState => ({ ...prevState, [key]: value }));
//           setErrors(prevState => ({ ...prevState, [key]: error }));
//         }
//       }
//       // Making sure that there's no error in the state
//       // before calling the submit callback function
//       if (!validateErrorState()) {
//         submitFormCallback(values);
//       }
//     },
//     [stateValidatorSchema, submitFormCallback, validateErrorState, values]
//   );

//   return {
//     handleOnChange,
//     handleOnSubmit,
//     values,
//     errors,
//     disable,
//     setValues,
//     setErrors
//   };
// }

// export default useForm;
