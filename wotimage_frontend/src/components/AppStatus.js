import Classifier from "./Classifier";
import React from "react";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";

function AppStatus() {
  return(
    <ThemeProvider>
    <SnackbarProvider maxSnack={3}>
      <Classifier />
    </SnackbarProvider>
  </ThemeProvider>
  );
}

export default AppStatus;