// React
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { markMessagesRead } from "../../redux/actions/userActions";
// Material-UI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// Icons
import MailIcon from "@material-ui/icons/Mail";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Helpers
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

class Messages extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    /*let unreadMessageIds = this.props.messages
      .filter((not) => !not.read)
      .map((not) => not.nid);
    this.props.markNotificationsRead(unreadMessageIds);*/
  };

  render() {
    const { messages } = this.props;
    const { anchorEl } = this.state;

    dayjs.extend(relativeTime);

    let mailIcon;

    if (messages && messages.length > 0) {
      messages.filter((msg) => msg.read === false).length > 0
        ? (mailIcon = (
            <Badge
              badgeContent={messages.filter((msg) => msg.read === false).length}
              color="secondary"
            >
              <MailIcon />
            </Badge>
          ))
        : (mailIcon = <MailIcon />);
    } else {
      mailIcon = <MailIcon />;
    }

    let messagesMarkup =
      messages && messages.length > 0 ? (
        messages.map((msg) => (
          <MenuItem key={msg.nid} onClick={this.handleClose}>
            <ChatIcon
              color={msg.read ? "primary" : "secondary"}
              style={{ marginRight: 10 }}
            />
            <Typography
              component={Link}
              color="inherit"
              variant="body1"
              to={`/conversations/${msg.sender.uid}`}
            >
              {msg.sender.name}: {msg.text} - {dayjs(msg.created).fromNow()}
            </Typography>
          </MenuItem>
        ))
      ) : (
        <MenuItem onClick={this.handleClose}>You have no new messages</MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Messages">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
            color="inherit"
          >
            {mailIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {messagesMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Messages.propTypes = {
  markMessagesRead: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  messages: state.user.messages,
});

export default connect(mapStateToProps, { markMessagesRead })(Messages);
