import React from "react";
import { shallow } from "enzyme";
import App from "../src/App";

describe("<App /> rendering", () => {
  it("should render App with router", () => {
    let wrapper = shallow(<App />);

    expect(wrapper.find("div").hasClass("app")).toBe(true);
    expect(wrapper.find("header").hasClass("header")).toBe(true);
    expect(wrapper.find("h1").hasClass("title")).toBe(true);
    expect(wrapper.find("h1").text()).toEqual("Form Demo");
    expect(wrapper.find("BrowserRouter").length).toBe(1);
    expect(wrapper.find("Switch").length).toBe(1);
    expect(wrapper.find("Route").length).toBe(3);
  });
});
