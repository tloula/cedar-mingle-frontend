// React
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// Icons
//Redux
import { connect } from "react-redux";
import { unmatchUser } from "../../redux/actions/dataActions";
// Helpers
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const styles = (theme) => ({
  ...theme.spread,
  card: {
    maxWidth: 450,
    margin: "0px 0px 20px 0px",
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

class MatchItem extends Component {
  handleUnmatch = (match) => {
    this.props.unmatchUser(match);
  };

  render() {
    const {
      classes,
      match: { name, uid, image, created },
    } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <CardMedia
                className={classes.media}
                image={image}
                component={Link}
                to={`/users/${uid}`}
              />
            </Grid>
            <Grid item sm={6} xs={12} className={classes.gridItem}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {dayjs(created).fromNow()}
                </Typography>
              </CardContent>

              <CardActions className={classes.cardActions}>
                <Button
                  size="small"
                  color="primary"
                  className={classes.matchButton}
                  onClick={() => {
                    this.handleUnmatch({ name, uid, image, created });
                  }}
                >
                  Unmatch
                </Button>
                <Button
                  size="small"
                  color="primary"
                  className={classes.matchButton}
                  component={Link}
                  to={`/conversations/${uid}`}
                >
                  Message
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = { unmatchUser };

MatchItem.propTypes = {
  match: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MatchItem));
