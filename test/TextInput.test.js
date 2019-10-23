import React from "react";
import { shallow } from "enzyme";
import TextInput from "../src/components/TextInput";

const testProps = {
  name: "testName",
  type: "text",
  value: "",
  setValue: () => {}
};

describe("<TextInput /> rendering", () => {
  it("should render input", () => {
    let wrapper = shallow(<TextInput {...testProps} />);
    expect(wrapper.find("input")).toHaveLength(1);
  });
});
