// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { deleteAccount } from "../../redux/actions/userActions";
// Material-UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class DeleteAccount extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteAccount = () => {
    this.props.deleteAccount(this.props.match);
    this.setState({ open: false });
  };

  render() {
    return (
      <Fragment>
        <div
          style={{
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          <Button
            onClick={this.handleOpen}
            color="secondary"
            variant="contained"
            style={{
              marginLeft: "10px",
              display: "inline-block",
              width: "100%",
            }}
          >
            Delete Account
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? This cannot be
              undone. If you change your mind, you can always create a new
              account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteAccount} color="secondary">
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteAccount.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { deleteAccount })(
  withStyles(styles)(DeleteAccount)
);
