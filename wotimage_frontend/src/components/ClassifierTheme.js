
const ClassifierTheme = (theme) => ({
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

export default ClassifierTheme;