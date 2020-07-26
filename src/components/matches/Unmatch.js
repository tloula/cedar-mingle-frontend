// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { unmatchUser } from "../../redux/actions/dataActions";
// Material-UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  matchButton: {
    margin: "auto",
  },
};

class Unmatch extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  unmatchUser = () => {
    this.props.unmatchUser(this.props.match);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { name } = this.props.match;

    return (
      <Fragment>
        <Button
          size="small"
          color="primary"
          className={classes.matchButton}
          onClick={this.handleOpen}
        >
          Unmatch
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to unmatch with {name}?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.unmatchUser} color="secondary">
              Unmatch
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

Unmatch.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.string.isRequired,
};

export default connect(null, { unmatchUser })(withStyles(styles)(Unmatch));
