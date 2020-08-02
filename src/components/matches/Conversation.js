// React
import PropTypes from "prop-types";
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  sendMessage,
  markMessagesRead,
  getConversation,
} from "../../redux/actions/dataActions";
// MUI stuff
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import TextField from "@material-ui/core/TextField";
import { Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import RefreshIcon from "@material-ui/icons/Refresh";
// Components
import MyButton from "../../util/MyButton";
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
  bubble: {
    padding: "6px 8px 6px 8px",
    marginBottom: "2px",
    backgroundColor: "#efefef",
    borderRadius: "8px",
    display: "inline-block",
  },
});

class Conversation extends Component {
  state = { message: "", sending: false };

  componentDidMount() {
    this.refs.scrollbars.scrollToBottom();
  }

  componentDidUpdate() {
    this.refs.scrollbars.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (nextProps.data.sent) {
      this.setState({ sending: false });
      this.setState({ message: "" });
      this.refs.scrollbars.scrollToBottom();
    }
  }

  handleMarkMessagesRead = (conversation, uid) => {
    function compileIds(message) {
      return { mid: message.mid, cid: message.cid };
    }

    function determineEligibility(message) {
      if (message.sender.uid !== uid && !message.read) return !message.read;
      else return;
    }

    if (conversation.user) {
      let unreadMessageIds = conversation.messages
        .filter((message) => determineEligibility(message))
        .map((message) => compileIds(message));
      if (Array.isArray(unreadMessageIds) && unreadMessageIds.length)
        this.props.markMessagesRead(unreadMessageIds);
    }
  };

  handleSendMessage = (user) => {
    let message = {
      text: this.state.message,
      uid: user.uid,
      name: user.name,
    };
    this.setState({ sending: true });
    this.props.sendMessage(message);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRefresh = () => {
    let uid = this.props.conversation.user.uid;
    if (uid) this.props.getConversation(uid);
  };

  render() {
    const { classes, conversation, uid } = this.props;
    const {
      UI: { loadingSecondary },
    } = this.props;
    const { message, sending } = this.state;

    let otherSenderMessage = (name, body, date) => (
      <ListItem key={date} alignItems="flex-start" style={{ width: "75%" }}>
        <Box component="span" display={{ xs: "none", sm: "none", md: "block" }}>
          <ListItemAvatar display={{ xs: "none", sm: "none", md: "block" }}>
            <Avatar>{name[0]}</Avatar>
          </ListItemAvatar>
        </Box>
        <ListItemText
          primary={
            <span className={classes.bubble}>
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                ></Typography>
                {body}
              </React.Fragment>
            </span>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="caption"
                className={classes.inline}
                color="textSecondary"
              >
                {dayjs(date).fromNow()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );

    let authenticatedSenderMessage = (name, body, date) => (
      <ListItem
        key={date}
        alignItems="flex-start"
        style={{ width: "75%", marginRight: "0px", marginLeft: "auto" }}
      >
        <ListItemText
          primary={
            <span className={classes.bubble}>
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                ></Typography>
                {body}
              </React.Fragment>
            </span>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="caption"
                className={classes.inline}
                color="textSecondary"
              >
                {dayjs(date).fromNow()}
              </Typography>
            </React.Fragment>
          }
          style={{ textAlign: "right", paddingRight: "10px" }}
        />
        <Box component="span" display={{ xs: "none", sm: "none", md: "block" }}>
          <ListItemAvatar>
            <Avatar>{name[0]}</Avatar>
          </ListItemAvatar>
        </Box>
      </ListItem>
    );

    return (
      <>
        <Scrollbars
          style={{ maxHeight: 600 }}
          autoHeightMax={600}
          autoHeight
          ref="scrollbars"
          onScrollStop={() => {
            this.handleMarkMessagesRead(conversation, uid);
          }}
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
              <p>
                Select an existing conversation of the left, or start a new
                conversation from your matches page.
              </p>
            )}
          </List>
        </Scrollbars>
        <div className={classes.form}>
          {conversation && conversation.user && (
            <>
              <TextField
                name="message"
                type="text"
                variant="outlined"
                color="secondary"
                multiline
                rowsMax={4}
                value={message}
                label={"Send a message to " + conversation.user.name}
                placeholder="Be creative..."
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <div style={{ float: "left" }}>
                <MyButton
                  tip="Refresh Messages"
                  onClick={this.handleRefresh}
                  btnClassName={classes.button}
                  style={{ float: "left" }}
                  disabled={loadingSecondary}
                >
                  {loadingSecondary ? (
                    <Tooltip placement="top" title="Refreshing...">
                      <CircularProgress
                        size={22}
                        className={classes.button}
                        style={{ verticalAlign: "middle" }}
                        color="secondary"
                      />
                    </Tooltip>
                  ) : (
                    <RefreshIcon color="secondary" />
                  )}
                </MyButton>
              </div>
              <Button
                onClick={() => {
                  this.handleSendMessage(conversation.user);
                }}
                color="secondary"
                variant="contained"
                style={{ float: "right" }}
                disabled={sending}
              >
                Send
                {sending && (
                  <CircularProgress
                    size={30}
                    style={{ position: "absolute" }}
                  />
                )}
              </Button>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
  sent: state.data.sent,
});

const mapActionsToProps = { sendMessage, markMessagesRead, getConversation };

Conversation.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  markMessagesRead: PropTypes.func.isRequired,
  getConversation: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Conversation));
