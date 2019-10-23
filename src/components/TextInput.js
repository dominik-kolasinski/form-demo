import * as React from "react";

function TextInput({ name, type, value, errorMessage, setValue }) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      value={value || ""}
      onChange={setValue}
      className={"input" + (errorMessage ? " error" : "")}
    />
  );
}

export default TextInput;
