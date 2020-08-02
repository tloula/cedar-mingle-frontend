// React
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import {
  getExplore,
  likeUser,
  passUser,
} from "../../redux/actions/dataActions";
// MUI stuff
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    textAlign: "center",
    margin: "30px auto",
    width: "50%",
  },
  matchPaper: {
    backgroundColor: "#3f50b5",
    padding: 0,
  },
  alert: {
    margin: "",
  },
  button: {
    width: "100%",
    borderColor: "#FFF",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#FFF",
      borderColor: "#FFF",
      boxShadow: "none",
      color: "#3f50b5",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#FFF",
      borderColor: "#FFF",
      color: "#3f50b5",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
});

class ExploreAction extends Component {
  handlePass = () => {
    this.props.passUser(this.props.uid);
  };

  handleLike = () => {
    this.props.likeUser(this.props.uid);
  };

  handleContinue = () => {
    this.props.getExplore();
  };

  render() {
    const {
      classes,
      UI: { loadingSecondary },
      data: { match, profile },
    } = this.props;

    return (
      <>
        {match ? (
          <Paper className={classes.matchPaper}>
            <Grid container className={classes.container} spacing={5}>
              <Grid item sm={6} xs={12}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={this.handleMessage}
                  disabled={loadingSecondary}
                  component={Link}
                  to={`/conversations/${profile.uid}`}
                >
                  Message User
                </Button>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleContinue}
                  disabled={loadingSecondary}
                >
                  Continue Exploring
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Paper className={classes.matchPaper}>
            <Grid container className={classes.container} spacing={5}>
              <Grid item sm={6} xs={12}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={this.handlePass}
                  disabled={loadingSecondary}
                >
                  Pass
                </Button>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleLike}
                  disabled={loadingSecondary}
                >
                  Like
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = { getExplore, likeUser, passUser };

ExploreAction.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getExplore: PropTypes.func.isRequired,
  likeUser: PropTypes.func.isRequired,
  passUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ExploreAction));
