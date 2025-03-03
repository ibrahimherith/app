import React from "react";

const Input = ({ label, name, type, value, onChange }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-gray-700 font-medium ">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={"w-full p-1 border rounded focus:outline-none focus:ring-2"}
        required
      />
    </div>
  );
};

export default Input;
