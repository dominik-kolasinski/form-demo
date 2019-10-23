import React from "react";

function SelectInput({ name, type, value, errorMessage, options, setValue }) {
  return (
    <select
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={setValue}
      className={"select" + (errorMessage ? " error" : "")}
    >
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
  );
}

export default SelectInput;
