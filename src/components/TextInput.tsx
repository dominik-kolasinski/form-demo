import React from "react";
import ErrorMessage from "./ErrorMessage";

interface TextInputProps {
  name: string;
  value: string;
  errorMessage: string;
  handleOnChange: () => void;
}

const TextInput: React.FC<TextInputProps> = props => (
  <>
    <ErrorMessage message={props.errorMessage} />
    <input
      id={props.name}
      name={props.name}
      type="text"
      value={props.value || ""}
      placeholder={props.name}
      onChange={props.handleOnChange}
      onBlur={props.handleOnChange}
      className={"input" + (props.errorMessage ? " error" : "")}
    />
  </>
);
export default TextInput;
