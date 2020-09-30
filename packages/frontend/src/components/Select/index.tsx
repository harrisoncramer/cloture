import React, { ReactElement } from "react";

export interface Option {
  value: string;
  label: string;
}
export interface SelectProps {
  options: Option[];
  option: string;
  callBack: (value: string) => void;
}

const Select = ({ options, option, callBack }: SelectProps): ReactElement => {
  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    callBack(e.currentTarget.value);
  };

  return (
    <>
      <label>Data:</label>
      <select onChange={handleSelect} name="optionPicker" id="optionPicker">
        {options.map(({ value, label }) => (
          <option selected={value === option} key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
