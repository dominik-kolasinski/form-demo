import React from "react";
import { withRouter } from "react-router";

import { objectCast } from "../../utils/objectCast";
import useForm from "../../hooks/useForm";
import { useState, dispatch } from "../../store/reducer";
import formDataJSON from "../../config-data/formData.json";

import TextField from "../text-field/TextField";
import SelectField from "../select-field/SelectField";
import DatePicker from "../date-picker/DatePicker";
import PrintJson from "../../utils/PrintJson";

import "./form.scss";

const Form: React.FC = (props: any) => {
  // import your state schema from json file
  const stateSchemaRaw = formDataJSON.data;

  const getOptionsValues = (inputName: string) => {
    const obj = stateSchemaRaw.find(o => o.name === inputName);
    return obj!.options;
  };

  const checkIfParentInputValid = (parentInputName: string) =>
    objectCast(values)[parentInputName].length;

  const getContidionalOptionsValues = (
    parentInputName: string,
    inputName: string
  ) => {
    let obj = stateSchemaRaw.find(o => o.name === inputName);
    let selectedField = objectCast(values)[parentInputName].toLowerCase();
    const res = (obj!.options as []).filter(
      (o: object) => Object.keys(o)[0] === selectedField
    );

    if (selectedField) {
      return Object.values(res)[0][selectedField];
    }
    return [];
  };

  const stateSchema = stateSchemaRaw.reduce(
    (obj, item) =>
      Object.assign(obj, {
        [item.name]: { value: item.value }
      }),
    {}
  );

  const stateValidatorSchema = stateSchemaRaw.reduce((obj, item) => {
    if (item.name === "email") {
      return Object.assign(obj, {
        [item.name]: {
          required: item.required,
          validator: {
            func: (value: string) =>
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
              ),
            error: "Email is not valid"
          }
        }
      });
    }
    return Object.assign(obj, { [item.name]: { required: item.required } });
  }, {});

  // Create your own validationStateSchema
  // stateSchema property should be the same in validationStateSchema
  // in-order a validation to works in your input.

  function onSubmitForm(state: object) {
    const errorsCheck = Object.values(errors).filter(
      value => value === undefined
    );

    if (!errorsCheck.length) {
      props.history.push({
        pathname: "/results"
      });
      dispatch({ type: "addSubmittedFormData", payload: values });
    }
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  );

  return (
    <section>
      {/* <Calendar width="302px" /> */}
      <form onSubmit={handleOnSubmit} autoComplete="off">
        <DatePicker />
        {stateSchemaRaw.map(schemaItem => {
          if (schemaItem.type === "text") {
            return (
              <TextField
                key={schemaItem.name}
                name={schemaItem.name}
                value={objectCast(values)[schemaItem.name]}
                errorMessage={objectCast(errors)[schemaItem.name]}
                handleOnChange={handleOnChange}
              />
            );
          }
          if (schemaItem.type === "select" && schemaItem.conditionalParent) {
            return (
              <SelectField
                key={schemaItem.name}
                name={schemaItem.name}
                value={objectCast(values)[schemaItem.name]}
                errorMessage={objectCast(errors)[schemaItem.name]}
                handleOnChange={handleOnChange}
                options={getContidionalOptionsValues(
                  schemaItem.conditionalParent,
                  schemaItem.name
                )}
                disabled={
                  !checkIfParentInputValid(schemaItem.conditionalParent)
                }
              />
            );
          }
          if (schemaItem.type === "select" && schemaItem.conditionalChild) {
            return (
              <SelectField
                key={schemaItem.name}
                name={schemaItem.name}
                value={objectCast(values)[schemaItem.name]}
                errorMessage={objectCast(errors)[schemaItem.name]}
                handleOnChange={handleOnChange}
                options={getOptionsValues(schemaItem.name)}
                conditionalChild={schemaItem.conditionalChild}
                disabled={false}
              />
            );
          }
          return null;
        })}
        <div className="form-submit-button-container">
          <input
            type="submit"
            name="submit"
            disabled={disable}
            className="form-submit-button"
          />
        </div>
      </form>
      {<PrintJson data={values} />}
    </section>
  );
};

export default withRouter(Form);
