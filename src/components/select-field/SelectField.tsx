import React from "react";
import { capitalize } from "../../utils/capitalize";
import ErrorMessage from "../ErrorMessage";
import "./select-field.scss";

interface SelectFieldProps {
  name: string;
  value: string;
  options: any;
  disabled: boolean;
  errorMessage: string;
  conditionalParent?: string;
  conditionalChild?: string;
  handleOnChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    conditionalChild?: string,
    conditionalParent?: string
  ) => void;
}

const SelectField: React.FC<SelectFieldProps> = props => (
  <div
    className={"select-field-container" + (props.errorMessage ? " error" : "")}
  >
    <select
      className="select-field-input"
      id={props.name}
      name={props.name}
      value={props.value}
      onChange={e =>
        props.handleOnChange(e, props.conditionalChild, props.conditionalParent)
      }
      onBlur={props.handleOnChange}
      disabled={props.disabled}
      placeholder={`Choose ${props.name}`}
    >
      <option value="" className="select-field-option">
        Choose {props.name}
      </option>
      {props.options &&
        props.options.map((obj: object) => {
          let option = Object.entries(obj)[0];

          return (
            <option
              key={option[0]}
              value={option[1]}
              className="select-field-option"
            >
              {option[1]}
            </option>
          );
        })}
    </select>
    <span className="select-field-highlight"></span>
    <span
      className={
        "select-field-underline" + (props.errorMessage ? " error" : "")
      }
    ></span>
    <label htmlFor={props.name} className="select-field-label">
      {props.errorMessage ? (
        <ErrorMessage message={props.errorMessage} />
      ) : (
        capitalize(props.name)
      )}
    </label>
  </div>
);

export default SelectField;
