import { createRoot } from "react-dom/client";

import { Grid } from "@mui/material";
import { Body } from "./components/body";
import { Header } from "./components/header";

const root = createRoot(document.getElementById("root"));
const body = (
  <Grid container spacing={2} justifyContent="flex-start">
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs={12}>
      <Body />
    </Grid>
  </Grid>
);

root.render(body);
