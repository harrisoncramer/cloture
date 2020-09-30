import React from "react";
import Select from "react-select";
import { ValueType } from "react-select";

// Get style variables
import styles from "../../styles/abstracts/_variables.scss";

type Option = {
  value: string;
  label: string;
};

interface ReactSelectProps {
  option: string;
  options: Option[];
  callBack: (value: string) => void;
}

const ReactSelect = ({
  options,
  callBack,
  option,
}: ReactSelectProps): React.ReactElement => {
  const [selectedOption, setSelectedOption] = React.useState<ValueType<Option>>(
    options.filter((o) => o.value === option)
  );

  const handleChange = (option: Option) => {
    setSelectedOption(option);
    callBack(option.value);
  };

  return (
    <Select
      theme={(rTheme) => ({
        ...rTheme,
        colors: {
          ...rTheme.colors,
          primary: styles.primaryColor,
        },
      })}
      value={selectedOption}
      // React-select has some weird typing issues...
      onChange={(option) => handleChange(option as Option)}
      options={options}
    />
  );
};

export default ReactSelect;
