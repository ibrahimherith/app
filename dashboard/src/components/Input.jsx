import React from "react";

const Input = ({ prop }) => {
  return (
    <div className="space-y-1">
      <label htmlFor="name" className="block text-gray-700 font-medium ">
        Jina Kamili
      </label>
      <input
        type={prop.type}
        id={prop.id}
        name={prop.name}
        value={prop.value}
        onChange={prop.onChange}
        className={"w-full p-1 border rounded focus:outline-none focus:ring-2"}
        required
      />
    </div>
  );
};

export default Input;
