export default {
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#fff",
    },
  },
  spread: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    select: {
      margin: "10px auto 10px auto",
      fullWidth: true,
    },
    button: {
      position: "relative",
      fontWeight: "505",
    },
    customError: {
      color: "#ab003c",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    paper: {
      padding: 0,
    },
    profileItem: {
      margin: "10px 0px 10px 0px",
    },
    rightGrid: {
      padding: "40px 40px 20px 40px",
    },
    profile: {
      position: "relative",
      height: "100%",
      marginBottom: "50px",
      textAlign: "left",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
      "& .interest": {
        margin: 5,
      },
      "& .interests": {
        textAlign: "center",
      },
      "& hr": {
        color: "#e0e0e0",
        margin: "10px 0 10px 0",
        border: "1px solid",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
      "& .profileItems": {
        padding: "10px",
      },
      "& .profileButtons": {
        width: "100%",
        position: "absolute",
        bottom: "0px",
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
};
