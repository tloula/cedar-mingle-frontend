// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { changePassword } from "../../redux/actions/userActions";
// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ResendVerification from "../matches/ResendVerification";

const styles = (theme) => ({
  ...theme.spread,
  button: {
    float: "right",
  },
});

class EditAccount extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (nextProps.user.edited) {
      this.handleClose();
    }
  }

  mapUserSettingsToState = (settings) => {
    this.setState({
      email: settings.email ? settings.email : false,
      errors: {},
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserSettingsToState(this.props.settings);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { settings } = this.props;
    this.mapUserSettingsToState(settings);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const data = {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.changePassword(data);
  };

  render() {
    const { classes } = this.props;
    const { errors, email } = this.state;

    return (
      <Fragment>
        <Typography
          tip="Edit Account"
          onClick={this.handleOpen}
          className={classes.button}
        >
          Account
        </Typography>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Account</DialogTitle>
          <DialogContent>
            <Typography>{email}</Typography>
            <form>
              <TextField
                name="password"
                type="password"
                label="New Password"
                placeholder="New password"
                helperText={errors.password}
                error={errors.password ? true : false}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm password"
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <ResendVerification />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditAccount.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  editUserSettings: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.user.settings,
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, { changePassword })(
  withStyles(styles)(EditAccount)
);
