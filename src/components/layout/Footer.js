// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Material-UI
import { Typography, Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
// Components
import AppIcon from "../../images/icon.png";

const styles = (theme) => ({
  ...theme.spread,
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.footer}>
        <Grid container spacing={0}>
          <Grid item sm>
            <img src={AppIcon} alt="CM" className={classes.image} />
          </Grid>
          <Grid item sm style={{ margin: "auto" }}>
            {" "}
            <Typography variant="body2">
              Copyright &copy; Cedar Mingle 2020
            </Typography>
            <Typography variant="body2">
              <Link to="/terms">Terms &amp; Conditions</Link> |{" "}
              <Link to="/privacy">Privacy Policy</Link> |{" "}
              <Link to="/disclaimer">Legal Disclaimer</Link>
            </Typography>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
