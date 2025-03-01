import React from "react";

const InputText = ({ props }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={props.id} className="block text-gray-700 font-medium ">
        {props.label}
      </label>
      <input
        type="text"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={"w-full p-1 border rounded focus:outline-none focus:ring-2"}
        required
      />
    </div>
  );
};

export default InputText;
