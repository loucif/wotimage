import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BsCardImage } from "react-icons/bs";
import axios from "axios";
import { withSnackbar } from "notistack";


const styles = (theme) => ({
  back: {
    padding: theme.spacing(1),
    background: "#e0e0e0",
    width: "100%"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  textmuted: {
    color: "#bdbdbd"
  },
  imagefontsize: {
    fontSize: "3rem",
    "@media (min-width:600px)": {
      fontSize: "3rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem"
    },
    color: "#bdbdbd"
  }
});

class Classifier extends Component {
  state = {
    open: false,
    files: [],
    currentimage: null
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleToggle = () => {
    this.setState({ open: true });
  };
  loadImage = (files) => {
    // add processing here
    console.log(files[0].name);
    console.log(this.state.files[0].name);
    this.handleClose();
  };
  
  onDrop = (files) => {
    this.setState(
      {
        files,
        open: true
      },
      () => {
        console.log(this.state.files);
      }
    );
    this.loadImage(files);
    this.handleConnectionLoss("File is loaded", "success");
  };

  sendImage = () => {
    let formData = new FormData();
    formData.append("picture", this.state.files[0], this.state.files[0].name);

    this.handleConnectionLoss("Processing ...", "warning");
    axios
      .post("http://127.0.0.1:8000/api/images/", formData, {
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data"
        }
      })
      .then((resp) => {
        //        this.getImages(resp);
        console.log(resp);
        this.handleConnectionLoss("Classified", "success");
      })
      .catch((err) => {
        console.log(err);
        this.handleConnectionLoss("Error", "error");
      });
  };

  getImages = (obj) => {
    axios
      .get("http://127.0.0.1:8000/api/images/".concat(obj.data.id, "/"), {
        headers: {
          accept: "application/json"
        }
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
        this.handleConnectionLoss("error", "error");
      });
  };

  handleConnectionLoss = (message, variant) => {
    this.key = this.props.enqueueSnackbar(message, { variant: variant });
  };

  /*  handleBackOnline = () => {
    this.props.closeSnackbar(this.key);
  };*/

  render() {
    const { classes } = this.props;

    const files = this.state.files.map((file) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <div>
        <Dropzone onDrop={this.onDrop} accept="image/*">
          {({ isDragActive, getRootProps, getInputProps }) => (
            <section className="container">
              <div>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className={classes.back}
                >
                  <input {...getInputProps()} />
                  <BsCardImage className={classes.imagefontsize} />
                  <p className={classes.textmuted}>
                    {isDragActive
                      ? "Drop some image"
                      : "Drag n' drop some files here, or click to select files"}
                  </p>
                </div>
              </div>
              <aside>
                <ul>{files}</ul>
              </aside>
              {this.state.files.length > 0 && (
                <Button
                  variant="contained"
                  onClick={this.sendImage}
                >
                  Process
                </Button>
              )}
            </section>
          )}
        </Dropzone>

        <Backdrop
          className={classes.backdrop}
          open={this.state.open}
          onClick={this.handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(Classifier));
