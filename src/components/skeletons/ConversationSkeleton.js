// React
import PropTypes from "prop-types";
import React from "react";
// Material-UI
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    width: "100%",
    //maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
});

const otherSenderMessage = (
  <ListItem alignItems="flex-start" style={{ width: "75%" }}>
    <Box component="span" display={{ xs: "none", sm: "none", md: "block" }}>
      <ListItemAvatar display={{ xs: "none", sm: "none", md: "block" }}>
        <Skeleton variant="circle" width={40} height={40} />
      </ListItemAvatar>
    </Box>
    <ListItemText
      primary={
        <span
          style={{
            padding: "6px 8px 6px 8px",
            marginBottom: "2px",
            backgroundColor: "#efefef",
            borderRadius: "8px",
            display: "inline-block",
            width: "75%",
          }}
        >
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              style={{ display: "inline" }}
              color="textPrimary"
            ></Typography>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </React.Fragment>
        </span>
      }
    />
  </ListItem>
);

const authenticatedSenderMessage = (
  <ListItem
    alignItems="flex-start"
    style={{ width: "75%", marginRight: "0px", marginLeft: "auto" }}
  >
    <ListItemText
      primary={
        <span
          style={{
            padding: "6px 8px 6px 8px",
            marginBottom: "2px",
            backgroundColor: "#efefef",
            borderRadius: "8px",
            display: "inline-block",
            width: "75%",
          }}
        >
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              style={{ display: "inline" }}
              color="textPrimary"
            ></Typography>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </React.Fragment>
        </span>
      }
      style={{ textAlign: "right", paddingRight: "10px" }}
    />
    <Box component="span" display={{ xs: "none", sm: "none", md: "block" }}>
      <ListItemAvatar>
        <Skeleton variant="circle" width={40} height={40} />
      </ListItemAvatar>
    </Box>
  </ListItem>
);

const ConversationSkeleton = (props) => {
  const { classes } = props;
  return (
    <List className={classes.container}>
      {authenticatedSenderMessage}
      {otherSenderMessage}
      {authenticatedSenderMessage}
      {otherSenderMessage}
    </List>
  );
};

ConversationSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConversationSkeleton);
