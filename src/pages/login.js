// React
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { loginUser, forgotPassword } from "../redux/actions/userActions";
// Material-UI
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Paper } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      sending: false,
      snackbarOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors, sending: false });
    }
    if (nextProps.user.sent) {
      this.setState({ sending: false, snackbarOpen: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleForgotPassword = (event) => {
    this.setState({ sending: true });
    this.props.forgotPassword({ email: this.state.email });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors, sending, snackbarOpen } = this.state;

    return (
      <>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Paper className={classes.paper}>
              <div style={{ padding: "25px 35px" }}>
                <Typography variant="h3" className={classes.pageTitle}>
                  Login
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    className={classes.textField}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  {errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                      {errors.general}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={loading}
                    style={{ width: "100%" }}
                  >
                    Login
                    {loading && (
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                  <Button
                    onClick={() => this.handleForgotPassword()}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={sending}
                    style={{ width: "100%", marginTop: "15px" }}
                  >
                    Forgot Password
                    {sending && (
                      <CircularProgress
                        size={30}
                        style={{ position: "absolute" }}
                      />
                    )}
                  </Button>
                </form>
              </div>
            </Paper>
          </Grid>
          <Grid item sm />
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleCloseSnackbar}
          message="An email with instructions to reset your password has been sent to your email"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleCloseSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
  forgotPassword,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
