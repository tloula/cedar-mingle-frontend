// React
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
//Redux
import { connect } from "react-redux";
// Helpers
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const styles = (theme) => ({
  ...theme.spread,
  container: {
    width: "100%",
    //maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  ListItemText: {
    display: "flex",
    justifyContent: "space-between",
  },
});

class Conversations extends Component {
  isSelected = (index) => {
    return this.state.selectedIndex === index;
  };

  render() {
    const { classes, conversations, uid } = this.props;

    return (
      <List className={classes.container}>
        {conversations
          .sort(function (x, y) {
            return x.updated < y.updated;
          })
          .map((conversation) => (
            <ListItem
              alignItems="flex-start"
              button
              selected={conversation.uid === uid}
              component={Link}
              to={`/conversations/${conversation.uid}`}
            >
              <ListItemAvatar>
                <Avatar
                  alt={conversation.name}
                  src="/static/images/avatar/1256.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <React.Fragment>
                      <>{conversation.name}</>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textSecondary"
                      >
                        {dayjs(conversation.latest.created).fromNow()}
                      </Typography>
                    </React.Fragment>
                  </div>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      <>
                        {conversation.latest.sender.name !==
                          conversation.name && "You: "}
                      </>
                    </Typography>
                    {conversation.latest.text}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
      </List>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {};

Conversations.propTypes = {
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Conversations));
