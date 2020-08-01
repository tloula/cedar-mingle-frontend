// React
import React from "react";
import PropTypes from "prop-types";
// Material-UI
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import CloudIcon from "@material-ui/icons/Cloud";
import LocationOn from "@material-ui/icons/LocationOn";
import SchoolIcon from "@material-ui/icons/School";
import LanguageIcon from "@material-ui/icons/Language";
import WorkIcon from "@material-ui/icons/Work";

const styles = (theme) => ({
  ...theme.spread,
  nameLine: {
    width: "40%",
  },
  profileItem: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  icon: {
    float: "left",
  },
  halfLine: {
    width: "50%",
    marginLeft: "40px",
  },
  interest: {
    color: "#3f50b5",
    margin: "5px",
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <Skeleton variant="rect" width={600} height={600} />
        </Grid>
        <Grid item sm={6} xs={12} className={classes.rightGrid}>
          <div className={classes.profile}>
            <Typography variant="h3" color="primary">
              <Skeleton variant="text" className={classes.nameLine} />
            </Typography>
            <hr />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <div className="profileItems">
              <div className={classes.profileItem}>
                <SchoolIcon color="primary" className={classes.icon} />{" "}
                <Skeleton variant="text" className={classes.halfLine} />
              </div>
              <div className={classes.profileItem}>
                <WorkIcon color="primary" className={classes.icon} />{" "}
                <Skeleton variant="text" className={classes.halfLine} />
              </div>

              <div className={classes.profileItem}>
                <CloudIcon color="primary" className={classes.icon} />{" "}
                <Skeleton variant="text" className={classes.halfLine} />
              </div>
              <div className={classes.profileItem}>
                <LocationOn color="primary" className={classes.icon} />{" "}
                <Skeleton variant="text" className={classes.halfLine} />
              </div>
              <div className={classes.profileItem}>
                <LanguageIcon color="primary" className={classes.icon} />{" "}
                <Skeleton variant="text" className={classes.halfLine} />
              </div>
            </div>
            <div className="interests">
              <Chip
                label={"------------------"}
                color="primary"
                className={classes.interest}
              />
              <Chip
                label={"------------------"}
                color="primary"
                className={classes.interest}
              />
              <Chip
                label={"------------------"}
                color="primary"
                className={classes.interest}
              />
              <Chip
                label={"------------------"}
                color="primary"
                className={classes.interest}
              />
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
