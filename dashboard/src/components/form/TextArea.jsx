import React from "react";

const TextArea = ({ label, name, value, onChange }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-gray-700 font-medium">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="w-full border rounded p-2"
        maxLength={1000}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
