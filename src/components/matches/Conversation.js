// React
import PropTypes from "prop-types";
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { sendMessage } from "../../redux/actions/dataActions";
// MUI stuff
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
// 3rd Party
import { Scrollbars } from "react-custom-scrollbars";
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
});

class Conversation extends Component {
  state = { messageToSend: "" };

  componentDidMount() {
    // Scroll to bottom of messages
    const { scrollbars } = this.refs;
    scrollbars.scrollToBottom();
  }

  handleSendMessage = (user) => {
    let message = {
      text: this.state.messageToSend,
      uid: user.uid,
      name: user.name,
    };
    this.props.sendMessage(message);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes, conversation, uid } = this.props;
    const {
      UI: { loading, errors },
    } = this.props;

    let otherSenderMessage = (name, body, date) => (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name} src="/static/images/avatar/1256.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              ></Typography>
              {body}
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              ></Typography>
              {dayjs(date).fromNow()}
            </React.Fragment>
          }
        />
      </ListItem>
    );

    let authenticatedSenderMessage = (name, body, date) => (
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              ></Typography>
              {body}
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              ></Typography>
              {dayjs(date).fromNow()}
            </React.Fragment>
          }
        />
        <ListItemAvatar>
          <Avatar alt={name} src="/static/images/avatar/1256.jpg" />
        </ListItemAvatar>
      </ListItem>
    );

    return (
      <>
        <Scrollbars
          style={{ maxHeight: 650 }}
          autoHeightMax={650}
          autoHeight
          ref="scrollbars"
        >
          <List className={classes.container}>
            {conversation.messages ? (
              conversation.messages
                .sort(function (x, y) {
                  return x.created > y.created;
                })
                .map((message) =>
                  message.sender.uid === uid
                    ? authenticatedSenderMessage(
                        message.sender.name,
                        message.text,
                        message.created
                      )
                    : otherSenderMessage(
                        message.sender.name,
                        message.text,
                        message.created
                      )
                )
            ) : (
              <p>We can't talk for you</p>
            )}
          </List>
        </Scrollbars>
        {conversation && conversation.user && (
          <TextField
            name="messageToSend"
            type="text"
            label={"Send Message to " + conversation.user.name}
            placeholder="Be creative..."
            className={classes.textField}
            onChange={this.handleChange}
            fullWidth
          />
        )}
        <Button
          onClick={() => {
            this.handleSendMessage(conversation.user);
          }}
          color="primary"
        >
          Send
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = { sendMessage };

Conversation.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Conversation));
