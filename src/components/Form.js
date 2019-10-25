import React from "react";
import useForm from "../useForm";

import PrintJson from "../utils/PrintJson";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

function Form() {
  // Define your state schema
  const stateSchemaRaw = [
    {
      name: "name",
      value: "",
      label: "Name",
      type: "text",
      required: true
    },
    {
      name: "nickname",
      value: "",
      label: "Nickname",
      type: "text",
      required: false
    },
    {
      name: "email",
      value: "",
      label: "Email",
      type: "text",
      required: true
    },
    {
      name: "field",
      value: "",
      label: "Field",
      type: "select",
      options: [{ it: "IT" }, { product: "Product" }, { content: "Content" }],
      required: true
    },
    {
      name: "position",
      value: "",
      label: "Position",
      type: "select",
      options: [
        {
          it: [
            { frontEndDeveloper: "Front-end developer" },
            { backEndDeveloper: "Back-end developer" },
            { devOps: "Devopr" },
            { webmaster: "Webmaster" }
          ]
        },

        {
          product: [
            { productOwner: "Product Owner" },
            { uxDesigner: "UX Designer" },
            { uiDesigner: "UI Designer" }
          ]
        },
        {
          content: [
            { jrCopywriter: "Junior Copywriter" },
            { srCopywriter: "Senior Copywriter" }
          ]
        }
      ],
      required: true
    }
  ];

  const getOptionsValues = inputName => {
    let obj = stateSchemaRaw.find(o => o.name === inputName);
    return obj.options;
  };

  const checkIfParentInputValid = parentInputName =>
    values[parentInputName].length;

  const getContidionalOptionsValues = (parentInputName, inputName) => {
    let obj = stateSchemaRaw.find(o => o.name === inputName);
    let selectedField = values[parentInputName].toLowerCase();
    let res = obj.options.filter(o => Object.keys(o)[0] === selectedField);

    if (selectedField) {
      return Object.values(res)[0][selectedField];
    }
    return [];

    //TODO cleanup this shit and add router to new view
  };

  const stateSchema = stateSchemaRaw.reduce(
    (obj, item) =>
      Object.assign(obj, {
        [item.name]: { value: item.value }
      }),
    {}
  );

  const stateValidatorSchema = stateSchemaRaw.reduce((obj, item) => {
    if (item.name === "email") {
      return Object.assign(obj, {
        [item.name]: {
          required: item.required,
          validator: {
            func: value =>
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
              ),
            error: "Email is not valid"
          }
        }
      });
    }
    return Object.assign(obj, { [item.name]: { required: item.required } });
  }, {});

  // Create your own validationStateSchema
  // stateSchema property should be the same in validationStateSchema
  // in-order a validation to works in your input.

  function onSubmitForm(state) {
    // alert(JSON.stringify(state, null, 2));
    // console.log("submitted state:");
    // console.log(state);
  }

  const { values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  );

  const { name, nickname, email, field, position } = values;

  return (
    <section>
      <form onSubmit={handleOnSubmit}>
        <TextInput
          name="name"
          value={name}
          errorMessage={errors.name}
          handleOnChange={handleOnChange}
        />
        <TextInput
          name="nickname"
          value={nickname}
          errorMessage={errors.nickname}
          handleOnChange={handleOnChange}
        />
        <TextInput
          name="email"
          value={email}
          errorMessage={errors.email}
          handleOnChange={handleOnChange}
        />
        <SelectInput
          name="field"
          value={field}
          errorMessage={errors.field}
          handleOnChange={handleOnChange}
          options={getOptionsValues("field")}
          conditionalFor={"position"}
        />
        <SelectInput
          name="position"
          value={position}
          errorMessage={errors.position}
          handleOnChange={handleOnChange}
          options={getContidionalOptionsValues("field", "position")}
          disabled={!checkIfParentInputValid("field")}
        />
        <input type="submit" name="submit" disabled={disable} />
      </form>
      {<PrintJson data={values} />}
    </section>
  );
}

export default Form;
