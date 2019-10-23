import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("<App /> rendering", () => {
  it("should render App", () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find(".App").length).toBe(1);
  });
});
