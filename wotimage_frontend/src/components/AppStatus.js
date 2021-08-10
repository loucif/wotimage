import React from "react";
import { SnackbarProvider } from "notistack";
import Classifier from "./Classifier";
import { ThemeProvider } from "@material-ui/core/styles";

const AppStatus = () => (
  <ThemeProvider>
    <SnackbarProvider maxSnack={3}>
      <Classifier />
    </SnackbarProvider>
  </ThemeProvider>
);

export default AppStatus;