import React from "react";
import ErrorMessage from "./ErrorMessage";

interface SelectInputProps {
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

const SelectInput: React.FC<SelectInputProps> = props => (
  <>
    <ErrorMessage message={props.errorMessage} />
    <select
      id={props.name}
      name={props.name}
      value={props.value}
      onChange={e =>
        props.handleOnChange(e, props.conditionalChild, props.conditionalParent)
      }
      onBlur={props.handleOnChange}
      className={"select" + (props.errorMessage ? " error" : "")}
      disabled={props.disabled}
    >
      <option value="">Choose {props.name}</option>
      {props.options &&
        props.options.map((obj: object) => {
          let option = Object.entries(obj)[0];

          return (
            <option key={option[0]} value={option[1]}>
              {option[1]}
            </option>
          );
        })}
    </select>
  </>
);

export default SelectInput;
