import React from "react";
import { capitalize } from "../../utils/capitalize";
import ErrorMessage from "../ErrorMessage";
import "./text-field.scss";

interface TextFieldProps {
  name: string;
  value: string;
  errorMessage: string;
  handleOnChange: () => void;
}

const TextField: React.FC<TextFieldProps> = props => (
  <div
    className={"text-field-container" + (props.errorMessage ? " error" : "")}
  >
    <input
      className="text-field-input"
      id={props.name}
      name={props.name}
      type="text"
      value={props.value || ""}
      onChange={props.handleOnChange}
      onBlur={props.handleOnChange}
    />
    <span className="text-field-highlight"></span>
    <span
      className={"text-field-underline" + (props.errorMessage ? " error" : "")}
    ></span>
    <label htmlFor={props.name} className="text-field-label">
      {props.errorMessage ? (
        <ErrorMessage message={props.errorMessage} />
      ) : (
        capitalize(props.name)
      )}
    </label>
  </div>
);
export default TextField;
