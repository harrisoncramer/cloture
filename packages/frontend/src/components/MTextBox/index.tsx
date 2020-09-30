import React, { useState, ReactElement } from "react";
import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
export interface SearchBoxProps {
  callBack: (query: string) => void;
  filter: string | null | undefined;
  instant?: boolean;
}

const MaterialSearchBox = ({
  callBack,
  filter,
  instant,
}: SearchBoxProps): ReactElement => {
  const [query, setQuery] = useState(filter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (instant) {
      handleSearch(e.target.value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query || "");
    }
  };

  const handleSearch = (term: string) => {
    // Assign search term to itself or an empty string.
    const searchTerm = term ?? "";
    callBack(searchTerm);
  };

  const handleClickSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    handleSearch(query || "");
  };

  return (
    <TextField
      //inputRef={(input) => input && input.focus()}
      value={query}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={(e) => handleClickSearch(e)}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MaterialSearchBox;
