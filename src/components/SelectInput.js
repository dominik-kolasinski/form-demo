import React from "react";
import ErrorMessage from "./ErrorMessage";

function SelectInput({
  name,
  value,
  errorMessage,
  options,
  handleOnChange,
  disabled,
  conditionalFor
}) {
  return (
    <>
      <ErrorMessage message={errorMessage} />
      <select
        id={name}
        name={name}
        type="select"
        value={value}
        onChange={e => handleOnChange(e, conditionalFor)}
        onBlur={handleOnChange}
        className={"select" + (errorMessage ? " error" : "")}
        disabled={disabled}
      >
        <option value="">Choose {name}</option>
        {options &&
          options.map(obj => {
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
}

export default SelectInput;
