// React
import PropTypes from "prop-types";
import React from "react";
//Redux
import { connect } from "react-redux";
// MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
});

const MatchItem = (props) => {
  const { classes } = props;

  return (
    <>
      <Card className={classes.matchCard}>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <Skeleton variant="rect" width={"100%"} height={"150px"} />
          </Grid>
          <Grid item sm={6} xs={12} className={classes.gridItem}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                <Skeleton variant="text" />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Skeleton variant="text" />
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

MatchItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(MatchItem));
