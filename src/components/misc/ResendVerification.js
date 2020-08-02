// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { resendVerification } from "../../redux/actions/dataActions";
// Material-UI
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";

const styles = {
  matchButton: {
    margin: "auto",
  },
};

class ResendVerification extends Component {
  state = { sending: false };

  handleResendVerification = () => {
    this.props.resendVerification();
    this.setState({ sending: true });
  };

  render() {
    const {
      settings: { verified },
    } = this.props;
    const { resent } = this.props;
    const { sending } = this.state;

    return (
      !verified && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          {resent ? (
            <div>
              <CheckIcon
                color="secondary"
                style={{ display: "inline", paddingRight: "5px" }}
              />
              <Typography
                color="secondary"
                style={{
                  display: "inline",
                  verticalAlign: "middle",
                  paddingBottom: "15px",
                }}
              >
                Verification Email Resent
              </Typography>
            </div>
          ) : (
            <Fragment>
              <Button
                onClick={() => {
                  this.handleResendVerification();
                }}
                color="secondary"
                variant="contained"
                disabled={sending}
              >
                Resend Verification Email
                {sending && (
                  <CircularProgress
                    size={30}
                    style={{ position: "absolute" }}
                  />
                )}
              </Button>
            </Fragment>
          )}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.user.settings,
  resent: state.user.resent,
  UI: state.UI,
});

ResendVerification.propTypes = {
  resendVerification: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { resendVerification })(
  withStyles(styles)(ResendVerification)
);
