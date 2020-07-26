// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { reportUser } from "../redux/actions/dataActions";
// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import CheckIcon from "@material-ui/icons/Check";
import SecurityIcon from "@material-ui/icons/Security";
// Components
import MyButton from "../util/MyButton";

const styles = (theme) => ({
  ...theme.spread,
});

class EditSettings extends Component {
  state = {
    description: "",
    reason: "",
    reported: "",
    errors: {},
    reporting: false,
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
      this.setState({ reporting: false });
    }
    if (nextProps.data.reported) {
      this.handleClose();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (uid) => {
    const report = {
      description: this.state.description,
      reason: this.state.reason,
      reported: uid,
    };
    this.props.reportUser(report);
    this.setState({ reporting: true });
  };

  render() {
    const { uid, name } = this.props;
    const { classes } = this.props;
    const { errors } = this.state;
    const { reported } = this.props;
    const { reporting } = this.state;

    return (
      <Fragment>
        {reported ? (
          <Tooltip placement="top" title="User Reported">
            <CheckIcon color="primary" />
          </Tooltip>
        ) : (
          <MyButton
            tip="Report User"
            onClick={this.handleOpen}
            btnClassName={classes.button}
          >
            <SecurityIcon color="primary" />
          </MyButton>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Report {name}</DialogTitle>
          <DialogContent>
            <form>
              <FormControl fullWidth>
                <InputLabel>Reason</InputLabel>
                <Select
                  name="reason"
                  helperText={errors.reason}
                  error={errors.reason ? true : false}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                >
                  <MenuItem value={"Inappropriate Content"}>
                    Inappropriate Content
                  </MenuItem>
                  <MenuItem value={"Fake Account"}>Fake Account</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="description"
                type="text"
                label="Description"
                placeholder="Please describe anything relevent"
                helperText={errors.description}
                error={errors.description ? true : false}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.handleSubmit(uid);
              }}
              color="primary"
              disabled={reporting}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditSettings.propTypes = {
  reportUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  reported: state.data.reported,
});

export default connect(mapStateToProps, { reportUser })(
  withStyles(styles)(EditSettings)
);
