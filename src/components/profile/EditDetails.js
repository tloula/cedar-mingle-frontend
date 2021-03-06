// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
// MUI
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// Icons
import EditIcon from "@material-ui/icons/Edit";
// Helpers
import DateFnsUtils from "@date-io/date-fns";
// Interests
import { allInterests } from "../../util/interests";

const styles = (theme) => ({
  ...theme.spread,
  button: {
    float: "right",
  },
});
class EditDetails extends Component {
  state = {
    about: "",
    birthday: "",
    dream: "",
    hometown: "",
    interests: [],
    major: "",
    name: "",
    occupation: "",
    website: "",
    year: "",
    errors: {},
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  mapUserDetailsToState = (profile) => {
    this.setState({
      about: profile.about ? profile.about : "",
      birthday: profile.birthday ? profile.birthday : new Date(),
      dream: profile.dream ? profile.dream : "",
      hometown: profile.hometown ? profile.hometown : "",
      interests: profile.interests ? profile.interests : [],
      major: profile.major ? profile.major : "",
      name: profile.name ? profile.name : "",
      occupation: profile.occupation ? profile.occupation : "",
      website: profile.website ? profile.website : "",
      year: profile.year ? profile.year : new Date(),
      errors: {},
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.profile);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { profile } = this.props;
    this.mapUserDetailsToState(profile);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleInterestChange = (event, value) => {
    this.setState({ interests: value });
  };

  handleBirthdayChange = (date) => {
    this.setState({ birthday: new Date(date) });
  };

  handleYearChange = (date) => {
    this.setState({ year: new Date(date.setMonth(4, 1)) });
  };

  handleSubmit = () => {
    const userDetails = {
      about: this.state.about,
      birthday: this.state.birthday,
      dream: this.state.dream,
      hometown: this.state.hometown,
      interests: this.state.interests,
      major: this.state.major,
      name: this.state.name,
      occupation: this.state.occupation,
      year: this.state.year,
      website: this.state.website,
    };
    this.props.editUserDetails(userDetails);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <EditIcon onClick={this.handleOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleSubmit}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Your Profile</DialogTitle>
          <DialogContent>
            <form>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="name"
                    type="text"
                    label="Name"
                    placeholder="Your name"
                    helperText={errors.name ? errors.name : undefined}
                    error={errors.name ? true : undefined}
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="hometown"
                    type="text"
                    label="Hometown"
                    placeholder="Where you're originally from"
                    helperText={errors.hometown ? errors.hometown : undefined}
                    error={errors.hometown ? true : undefined}
                    className={classes.textField}
                    value={this.state.hometown}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  clearable
                  disableFuture
                  name="birthday"
                  openTo="year"
                  format="mm/dd/yyyy"
                  label="Birthday"
                  helperText={errors.birthday ? errors.birthday : undefined}
                  error={errors.birthday ? true : undefined}
                  className={errors.textField ? errors.textField : undefined}
                  views={["year", "month", "date"]}
                  value={this.state.birthday}
                  onChange={this.handleBirthdayChange}
                  allowKeyboardControl
                  fullWidth
                />
              </MuiPickersUtilsProvider>
              <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                  <TextField
                    name="major"
                    type="text"
                    label="Major"
                    placeholder="Your major at CU"
                    helperText={errors.major ? errors.major : undefined}
                    error={errors.major ? true : undefined}
                    className={classes.textField}
                    value={this.state.major}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      clearable
                      views={["year"]}
                      name="year"
                      format="yyyy"
                      label="Graduation Year"
                      helperText={errors.year ? errors.year : undefined}
                      error={errors.year ? true : undefined}
                      className={classes.textField}
                      value={this.state.year}
                      onChange={this.handleYearChange}
                      allowKeyboardControl
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <TextField
                name="occupation"
                type="text"
                label="Employment"
                placeholder="Your job"
                helperText={errors.occupation ? errors.occupation : undefined}
                error={errors.occupation ? true : undefined}
                className={classes.textField}
                value={this.state.occupation}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="dream"
                type="text"
                label="Dream Job / Career"
                placeholder="What's the job of your dreams?"
                helperText={errors.dream ? errors.dream : undefined}
                error={errors.dream ? true : undefined}
                className={classes.textField}
                value={this.state.dream}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="about"
                type="text"
                label="About"
                multiline
                rows="5"
                maxLength={500}
                placeholder="A short description of yourself"
                helperText={errors.about ? errors.about : undefined}
                error={errors.about ? true : undefined}
                className={classes.textField}
                value={this.state.about}
                onChange={this.handleChange}
                fullWidth
              />
              <Autocomplete
                multiple
                name="interests"
                limitTags={4}
                options={allInterests}
                defaultValue={this.state.interests}
                className={classes.textField}
                onChange={this.handleInterestChange}
                error={errors.interests ? true : undefined}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Interests"
                    name="interests"
                  />
                )}
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal or professinal website"
                helperText={errors.website ? errors.website : undefined}
                error={errors.website ? true : undefined}
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
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

const mapStateToProps = (state) => ({
  profile: state.user.profile,
  user: state.user,
  data: state.data,
  UI: state.UI,
});

EditDetails.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
