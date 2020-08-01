import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import {
  logoutUser,
  getUserData,
  getNotifications,
} from "./redux/actions/userActions";
// Components
import Navbar from "./components/layout/Navbar";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";
import PrivateRoute from "./util/PrivateRoute";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import profile from "./pages/profile";
import explore from "./pages/explore";
import matches from "./pages/matches";
import conversations from "./pages/conversations";

import axios from "axios";

const theme = createMuiTheme({
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
      padding: "40px",
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
});

axios.defaults.baseURL = "http://localhost:5000/cedar-mingle/us-central1/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
    store.dispatch(getNotifications());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <PrivateRoute exact path="/explore" component={explore} />
                <PrivateRoute exact path="/matches" component={matches} />
                <PrivateRoute
                  exact
                  path="/conversations"
                  component={conversations}
                />
                <PrivateRoute
                  exact
                  path="/conversations/:uid"
                  component={conversations}
                />
                <PrivateRoute exact path="/users/:uid" component={user} />
                <PrivateRoute exact path="/profile" component={profile} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
