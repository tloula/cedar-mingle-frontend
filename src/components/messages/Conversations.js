// React
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Material-UI
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
//Redux
import { connect } from "react-redux";
// Helpers
import dayjs from "dayjs";
import { Scrollbars } from "react-custom-scrollbars";

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

  isBold = (conversation) => {
    if (
      !conversation.latest.read &&
      conversation.latest.sender.uid === conversation.uid
    ) {
      return { fontWeight: "bold", display: "inline" };
    } else {
      return { display: "inline" };
    }
  };

  render() {
    const { classes, conversations, uid } = this.props;

    return (
      <Scrollbars
        style={{ maxHeight: 550 }}
        autoHeightMax={550}
        autoHeight
        ref="scrollbars"
      >
        <List className={classes.container}>
          {conversations
            .sort(function (x, y) {
              return x.latest.created < y.latest.created;
            })
            .map((conversation) => (
              <ListItem
                button
                alignItems="flex-start"
                key={conversation.uid}
                selected={conversation.uid === uid}
                component={Link}
                to={`/conversations/${conversation.uid}`}
              >
                <ListItemAvatar>
                  <Avatar>{conversation.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="h6"
                          color="secondary"
                        >
                          {conversation.name}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textSecondary"
                        >
                          {dayjs(conversation.latest.created).fromNow()}
                        </Typography>
                      </React.Fragment>
                    </span>
                  }
                  secondary={
                    conversation.latest && (
                      <Fragment>
                        <Typography
                          component="span"
                          variant={"body2"}
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {conversation.latest.sender.uid !==
                            conversation.uid && "You: "}
                        </Typography>
                        <span style={this.isBold(conversation)}>
                          {conversation.latest.text}
                        </span>
                      </Fragment>
                    )
                  }
                />
              </ListItem>
            ))}
        </List>
      </Scrollbars>
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
