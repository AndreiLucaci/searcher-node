import * as React from "react";
import { Store } from "../stores";
import { TextField } from "@mui/material";

export const Header: React.FC = () => {
  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    Store.$searchTerm.next(value);
  };

  return (
    <TextField
      id="standard-basic"
      label="Standard"
      variant="standard"
      onChange={updateSearchTerm}
    />
  );
};
