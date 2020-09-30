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
  option: (string | null)[] | null | undefined;
  options: Option[];
  callBack: (value: string[]) => void;
}

const ReactSelect = ({
  options,
  callBack,
  option,
}: ReactSelectProps): React.ReactElement => {
  const [selectedOption, setSelectedOption] = React.useState<ValueType<Option>>(
    option && options.filter((o) => option.includes(o.value))
  );

  const handleChange = (newOptions: Option[] | null) => {
    setSelectedOption(newOptions);
    callBack(newOptions ? newOptions.map((x) => x.value) : []);
  };

  return (
    <Select
      isMulti
      theme={(rTheme) => ({
        ...rTheme,
        colors: {
          ...rTheme.colors,
          primary: styles.primaryColor,
        },
      })}
      value={selectedOption}
      // React-select has some weird typing issues...
      onChange={(newOptions) => handleChange(newOptions as Option[] | null)}
      options={options}
    />
  );
};

export default ReactSelect;
