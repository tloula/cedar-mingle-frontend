// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
import PropTypes from "prop-types";
// Material-UI
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      legal: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const data = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      legal: this.state.legal,
    };
    this.props.signupUser(data, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheckbox = (event) => {
    this.setState({
      [event.target.name]: !this.state.legal,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Paper className={classes.paper}>
            <div style={{ padding: "25px 35px" }}>
              <Typography variant="h3" className={classes.pageTitle}>
                Signup
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
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  className={classes.textField}
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  fullWidth
                />{" "}
                <FormControlLabel
                  control={
                    <Checkbox
                      name="legal"
                      color={"primary"}
                      checked={this.state.legal}
                      onChange={this.handleCheckbox}
                    />
                  }
                  label={
                    <Typography
                      variant="caption"
                      style={errors.legal ? { color: "red" } : undefined}
                    >
                      By checking this box you confirm that you have read and
                      that you agree to the{" "}
                      <Link to="/terms" target="_blank">
                        Terms and Conditions
                      </Link>
                      ,{" "}
                      <Link to="/privacy" target="_blank">
                        Privacy Policy
                      </Link>
                      , and{" "}
                      <Link to="/disclaimer" target="_blank">
                        Legal Disclaimer
                      </Link>
                      .
                    </Typography>
                  }
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
                  style={{ marginTop: "20px" }}
                >
                  SignUp
                  {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </form>
            </div>
          </Paper>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
