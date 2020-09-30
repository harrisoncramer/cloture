import React, { ReactElement } from "react";
import "./styles.scss";

interface CheckboxProps {
  label: string;
  checked: boolean;
  setChecked: (x: boolean) => void;
}

export default function Checkbox({
  label,
  checked,
  setChecked,
}: CheckboxProps): ReactElement | null {
  return (
    <div className="checkbox-root">
      <label>{label}</label>
      <input
        type="checkbox"
        data-testid="my-checkbox"
        onChange={(e) => setChecked(e.target.checked)}
        checked={checked}
        name={label}
      />
    </div>
  );
}
