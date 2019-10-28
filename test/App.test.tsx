import React from "react";
import { shallow } from "enzyme";
import App from "../src/App";

describe("<App /> rendering", () => {
  it("should render App", () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find(".app").length).toBe(1);
  });
});
