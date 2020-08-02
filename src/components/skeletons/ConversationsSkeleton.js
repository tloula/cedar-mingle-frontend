// React
import PropTypes from "prop-types";
import React, { Fragment } from "react";
// Material-UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Helpers
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const styles = (theme) => ({
  ...theme.spread,
  container: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
});

const listItem = (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Skeleton variant="circle" width={40} height={40} />
    </ListItemAvatar>
    <ListItemText
      primary={
        <React.Fragment>
          <Typography component="span" variant="h6" color="secondary">
            <Skeleton variant="text" />
          </Typography>
        </React.Fragment>
      }
      secondary={
        <Fragment>
          <Skeleton variant="text" />
        </Fragment>
      }
    />
  </ListItem>
);

const ConversationsSkeleton = (props) => {
  const { classes } = props;
  return (
    <List className={classes.container}>
      {listItem}
      {listItem}
      {listItem}
      {listItem}
      {listItem}
    </List>
  );
};

ConversationsSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConversationsSkeleton);
