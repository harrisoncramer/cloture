import React, { ReactElement, useState } from "react";

export interface TextBoxProps {
  placeholder: string;
  callBack: (val: string) => void;
  word: string;
}

export default function TextBox({
  placeholder,
  callBack,
  word,
}: TextBoxProps): ReactElement | null {
  const [input, setInput] = useState(word);
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const val = e.currentTarget.value;
    setInput(val);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callBack(input);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder={placeholder}
        data-testid="textbox"
        type="text"
        value={input}
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
}
