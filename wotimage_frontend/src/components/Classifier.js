import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import React, { Component } from "react";

import Backdrop from "@material-ui/core/Backdrop";
import { BsCardImage } from "react-icons/bs";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ClassifierTheme from "./ClassifierTheme";
import Dropzone from "react-dropzone";
import axios from "axios";
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";

class Classifier extends Component {
  state = {
    open: false,
    files: [],
    currentClassification: null
  };

  onDrop = (files) => {
    this.setState(
      {
        files,
      },
      () => {
        console.log(this.state.files);
      }
    );
    this.handleConnectionLoss("File is loaded", "success");
  };

  sendImage = () => {
    let formData = new FormData();
    formData.append("picture", this.state.files[0], this.state.files[0].name);

    this.handleConnectionLoss("Processing ...", "warning");
    this.setState({ open: true });

    axios
      .post("http://127.0.0.1:8000/api/images/", formData, {
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data"
        }
      })
      .then((resp) => {
        this.getImages(resp);
        this.setState({ open: false });
        this.handleConnectionLoss("Classified", "success");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ open: false });
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

        let data = []
        let classifiedArray = resp.data.classified.replace(/['([\]]/g, '').slice(0, -1).split('),')

        classifiedArray.forEach((item) => {
          const itemArray = item.split(',')
          data.push({
            subject: itemArray[1].concat('/',itemArray[2]),
            A: parseFloat(itemArray[2]),
            fullMark: 1,
          })
        })

        console.log(data)
        this.setState({ currentClassification: data });
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

        {this.state.currentClassification &&

          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={this.state.currentClassification}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Mike" dataKey="A" stroke="#ff6363" fill="#ff6363" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        }

        <Backdrop
          className={classes.backdrop}
          open={this.state.open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

export default withSnackbar(withStyles(ClassifierTheme)(Classifier));