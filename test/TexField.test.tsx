import React from "react";
import { mount, shallow } from "enzyme";
import { capitalize } from "../src/utils/capitalize";
import TextField from "../src/components/text-field/TextField";

const testProps = {
  name: "testName",
  type: "text",
  value: "",
  errorMessage: "",
  handleOnChange: () => {}
};

const testErrorProps = {
  name: "testName",
  type: "text",
  value: "",
  errorMessage: "testError",
  handleOnChange: () => {}
};

describe("<TextInput /> rendering", () => {
  it("should render input", () => {
    let wrapper = shallow(<TextField {...testProps} />);

    expect(wrapper.find("div").hasClass("text-field-container")).toBe(true);
    expect(wrapper.find("input").hasClass("text-field-input")).toBe(true);
    expect(
      wrapper
        .find("span")
        .at(0)
        .hasClass("text-field-highlight")
    ).toBe(true);
    expect(
      wrapper
        .find("span")
        .at(1)
        .hasClass("text-field-underline")
    ).toBe(true);
    expect(wrapper.find("label").hasClass("text-field-label")).toBe(true);
    expect(
      wrapper
        .find("label")
        .at(0)
        .text()
    ).toEqual(capitalize(testProps.name));
  });

  it("should render input with error message", () => {
    let wrapper = mount(<TextField {...testErrorProps} />);

    expect(wrapper.find("div").hasClass("text-field-container")).toBe(true);
    expect(wrapper.find("input").hasClass("text-field-input")).toBe(true);
    expect(
      wrapper
        .find("span")
        .at(0)
        .hasClass("text-field-highlight")
    ).toBe(true);
    expect(
      wrapper
        .find("span")
        .at(1)
        .hasClass("text-field-underline")
    ).toBe(true);
    expect(wrapper.find("label").hasClass("text-field-label")).toBe(true);
    expect(
      wrapper
        .find("label")
        .at(0)
        .text()
    ).toEqual(testErrorProps.errorMessage);
  });
});
