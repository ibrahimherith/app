import React from "react";

const InputSelect = ({ label, name, value, onChange }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-gray-700 font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-1 border rounded focus:outline-none focus:ring-2"
      >
        <option value="">Chagua Aina ya Habari</option>
        <option value="Makala">Makala</option>
        <option value="Habari za Runinga">Habari za Runinga</option>
        <option value="Habari za Redio">Habari za Redio</option>
        <option value="Habari za Mitandao ya Kijamii">
          Habari za Mitandao ya Kijamii
        </option>
        <option value="Picha / Video">Picha / Video</option>
      </select>
    </div>
  );
};

export default InputSelect;
