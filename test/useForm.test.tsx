import { act } from "react-dom/test-utils";
import { testHook } from "./testHook";
import useForm from "../src/hooks/useForm";

let form: any;
beforeEach(() => {
  testHook(() => {
    form = useForm(
      { test: { value: "" } },
      { test: { required: true } },
      values => {
        console.log(values);
      }
    );
  });
});

describe("useForm", () => {
  it("should have proper methods", () => {
    expect(form.handleOnChange).toBeInstanceOf(Function);
    expect(form.handleOnSubmit).toBeInstanceOf(Function);
    expect(form.setValues).toBeInstanceOf(Function);
    expect(form.setErrors).toBeInstanceOf(Function);

    expect(form.values).toBeInstanceOf(Object);
    expect(form.errors).toBeInstanceOf(Object);
    expect(form.disable).toBe(true || false);
  });
});
