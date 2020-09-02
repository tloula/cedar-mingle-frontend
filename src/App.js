// React
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import {
  logoutUser,
  getUserData,
  getNotifications,
} from "./redux/actions/userActions";
// Axios
import axios from "axios";
// Material-UI
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
// Components
import AuthRoute from "./routes/AuthRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import { lightTheme, darkTheme } from "./util/theme";
// Pages
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import profile from "./pages/profile";
import explore from "./pages/explore";
import matches from "./pages/matches";
import conversations from "./pages/conversations";
import terms from "./pages/terms";
import privacy from "./pages/privacy";
import disclaimer from "./pages/disclaimer";
// Helpers
import jwtDecode from "jwt-decode";
// Styles
import "./App.css";

// http://localhost:5000/cedar-mingle-dev/us-central1/api
// https://us-central1-cedar-mingle.cloudfunctions.net/api
axios.defaults.baseURL =
  "https://us-central1-cedar-mingle.cloudfunctions.net/api";

const FBIdToken = localStorage.FBIdToken;
if (FBIdToken) {
  const decodedToken = jwtDecode(FBIdToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = FBIdToken;
    store.dispatch(getUserData());
    store.dispatch(getNotifications());
  }
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("/token", {
          refresh_token: localStorage.FBRefreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            const FBIdToken = `Bearer ${res.data.FBIdToken}`;

            // 1) put token in LocalStorage
            localStorage.setItem("FBIdToken", FBIdToken);

            // 2) Change Authorization header
            axios.defaults.headers.common["Authorization"] = FBIdToken;

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        });
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);

class App extends Component {
  // This is never used, but required to update the state
  state = { theme: "light" };

  toggleTheme = () => {
    if (localStorage.theme === "dark") {
      this.setState({ theme: "light" });
      localStorage.setItem("theme", "light");
    } else {
      this.setState({ theme: "dark" });
      localStorage.setItem("theme", "dark");
    }
  };

  render() {
    const theme = createMuiTheme(
      localStorage.theme === "dark" ? darkTheme : lightTheme
    );
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>
              <div
                style={
                  localStorage.theme === "dark"
                    ? {
                        backgroundColor: "rgb(30, 32, 33)",
                        height: "100%",
                        overflow: "auto",
                      }
                    : { height: "100%", overflow: "auto" }
                }
              >
                <Navbar toggleTheme={this.toggleTheme} />
                <div className="container" style={{ height: "auto" }}>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      component={() => {
                        window.location.href = "/landing.html";
                        return null;
                      }}
                    />
                    <Route
                      path="/contact"
                      component={() => {
                        window.location.href = "/contact.html";
                        return null;
                      }}
                    />
                    <AuthRoute path="/login" component={login} />
                    <AuthRoute path="/signup" component={signup} />
                    <Route path="/terms" component={terms} />
                    <Route path="/privacy" component={privacy} />
                    <Route path="/disclaimer" component={disclaimer} />

                    <PrivateRoute path="/profile" component={profile} />
                    <PrivateRoute path="/explore" component={explore} />
                    <PrivateRoute path="/matches" component={matches} />
                    <PrivateRoute
                      exact
                      path="/conversations"
                      component={conversations}
                    />
                    <PrivateRoute
                      path="/conversations/:uid"
                      component={conversations}
                    />
                    <PrivateRoute path="/users/:uid" component={user} />
                  </Switch>
                </div>
                <Footer />
              </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
