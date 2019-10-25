import React from "react";

interface State {
  submittedFormData?: object;
}

interface Action {
  type: string;
  payload?: object;
}

let state: State = { submittedFormData: undefined };
const listeners = new Map();

function reduce(state: State, action: Action) {
  switch (action.type) {
    case "addSubmittedFormData":
      return { ...state, submittedFormData: action.payload };
    case "eraseSubmittedFormData":
      return { ...state, submittedFormData: undefined };
    default:
      throw new Error();
  }
}

export function dispatch(action: Action) {
  let i = 0;
  const prevValues = Array.from(listeners, ([getValue]) => getValue(state));

  // gets the new state
  state = reduce(state, action);

  // notify subscribed components
  listeners.forEach((setValue, getValue) => {
    const value = getValue(state);
    if (value !== prevValues[i++]) setValue(value);
  });
}

export function useState(getValue: Function) {
  const [value, setValue] = React.useState(getValue(state));

  React.useEffect(() => {
    // this stub is needed to get rid of typescript error
    const stubGet = () => {
      listeners.set(getValue, setValue);
      return () => listeners.delete(getValue);
    };

    stubGet();
  }, [getValue]);

  return value;
}
