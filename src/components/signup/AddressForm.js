// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Material-UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
});

class AddressForm extends Component {
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

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Create a Cedar Mingle Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={8}>
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
                  By checking this box you confirm that you have read and that
                  you agree to the{" "}
                  <Link
                    to="/terms"
                    target="_blank"
                    style={{ color: "#f50057" }}
                  >
                    Terms and Conditions
                  </Link>
                  ,{" "}
                  <Link
                    to="/privacy"
                    target="_blank"
                    style={{ color: "#f50057" }}
                  >
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link
                    to="/disclaimer"
                    target="_blank"
                    style={{ color: "#f50057" }}
                  >
                    Legal Disclaimer
                  </Link>
                  .
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12} sm={2}></Grid>
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

AddressForm.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(AddressForm));
