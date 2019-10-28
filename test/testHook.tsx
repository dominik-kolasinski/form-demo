import React from "react";
import { mount } from "enzyme";

const TestHook = ({ callback }: any) => {
  callback();
  return null;
};

export const testHook = (callback: any) => {
  mount(<TestHook callback={callback} />);
};
