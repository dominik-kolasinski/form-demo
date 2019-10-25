import * as React from "react";
import ErrorMessage from "./ErrorMessage";

function TextInput({ name, value, errorMessage, handleOnChange }) {
  return (
    <>
      <ErrorMessage message={errorMessage} />
      <input
        id={name}
        name={name}
        type="text"
        value={value || ""}
        placeholder={name}
        onChange={handleOnChange}
        onBlur={handleOnChange}
        className={"input" + (errorMessage ? " error" : "")}
      />
    </>
  );
}

export default TextInput;
