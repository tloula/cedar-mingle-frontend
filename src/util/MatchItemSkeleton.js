// React
import PropTypes from "prop-types";
import React from "react";
//Redux
import { connect } from "react-redux";
// MUI stuff
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
  card: {
    maxWidth: 450,
  },
  gridItem: {
    position: "relative",
  },
  media: {
    height: 150,
  },
  matchButton: {
    margin: "auto",
  },
  cardActions: {
    paddingLeft: "0px",
    paddingRight: "0px",
    position: "absolute",
    bottom: "0px",
    width: "100%",
  },
});

const MatchItem = (props) => {
  const { classes } = props;

  return (
    <>
      <Card className={classes.card}>
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
            <CardActions className={classes.cardActions}></CardActions>
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
