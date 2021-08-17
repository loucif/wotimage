import { AiFillGithub } from "react-icons/ai";
import AppBar from "@material-ui/core/AppBar";
import AppStatus from "./components/AppStatus";
import AppTheme from "./components/AppTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function App() {
  const classes = AppTheme();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.typography}>
            Whotimage
          </Typography>
          <IconButton href="https://github.com/loucif/wotimage" color="inherit">
            <AiFillGithub />
          </IconButton>
        </Toolbar>
      </AppBar>

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <div className={classes.classifier}>
            <AppStatus />
          </div>
        </Paper>
      </main>
      
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        {new Date().getFullYear()}
        {"."}
    </Typography>
    </React.Fragment>
  );
}

export default App;