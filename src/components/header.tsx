import { Box, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { Store } from "../stores";
import { Constants } from "../utils/constants";
import { useDebounce } from "use-debounce";
import { ElectronApiWindow } from "../utils/electronApi";

import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [dirPath, setDirPath] = React.useState("");

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      Store.$searchTerm.next(debouncedSearchTerm);
      console.log("searching for: " + debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    const electronWindow = window as unknown as ElectronApiWindow;
    electronWindow.electronAPI.__dirname().then((value) => {
      setDirPath(value);
    });
  }, []);

  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent={"flex-start"}
        style={{ marginTop: "2%" }}
      >
        <Grid item xs={12}>
          <Div>Current dir path: {dirPath}</Div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent={"flex-start"}
        style={{ marginTop: "2%" }}
      >
        <Grid item xs={8}>
          <TextField
            fullWidth={true}
            id="standard-basic"
            label="File name: "
            variant="standard"
            onChange={updateSearchTerm}
          />
        </Grid>
        <Grid item xs={4} justifyContent={"center center"}>
          <Typography variant="body1" component="h2">
            Looking for: {Constants.knownFileTypes.join(", ")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
