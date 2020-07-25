// React
import React from "react";
import PropTypes from "prop-types";
// Material-UI
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import SchoolIcon from "@material-ui/icons/School";
import LanguageIcon from "@material-ui/icons/Language";
import WorkIcon from "@material-ui/icons/Work";

const styles = (theme) => ({
  ...theme.spread,
  name: {
    height: 40,
    backgroundColor: theme.palette.primary.main,
    width: 200,
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10,
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item sm={6} xs={12}></Grid>
        <Grid item sm={6} xs={12}>
          <div className={classes.profile}>
            <div className={classes.name} />
            <hr />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className="profileItems">
              <SchoolIcon color="primary" />{" "}
              <div className={classes.profileItem}>
                <div className={classes.halfLine}></div>
              </div>
              <WorkIcon color="primary" />{" "}
              <div className={classes.profileItem}>
                <div className={classes.halfLine}></div>
              </div>
              <LocationOn color="primary" />{" "}
              <div className={classes.profileItem}>
                <div className={classes.halfLine}></div>
              </div>
              <LanguageIcon color="primary" />{" "}
              <div className={classes.profileItem}>
                <div className={classes.halfLine}></div>
              </div>
            </div>
            <div className="interests">
              <Chip label={"          "} color="primary" className="interest" />
              <Chip label={"          "} color="primary" className="interest" />
              <Chip label={"          "} color="primary" className="interest" />
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
