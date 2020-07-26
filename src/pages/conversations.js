// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Redux
import { connect } from "react-redux";
import {
  getConversations,
  getConversation,
} from "../redux/actions/dataActions";
// Material-UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// Components
import Conversations from "../components/matches/Conversations";
import Conversation from "../components/matches/Conversation";
// 3rd Party
import { Scrollbars } from "react-custom-scrollbars";

const styles = (theme) => ({
  ...theme.spread,
});

class conversations extends Component {
  getRequestedUID = () => {
    return this.props.match.params.uid;
  };

  componentDidMount() {
    this.props.getConversations();

    let uid = this.getRequestedUID();
    if (uid) this.props.getConversation(uid);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.uid !== prevProps.match.params.uid) {
      this.props.getConversation(this.props.match.params.uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      //this.setState({ body: "" });
    }
  }

  render() {
    const {
      classes,
      data: { conversations, conversation },
      user: {
        profile: { uid },
      },
      UI: { loading, errors },
    } = this.props;

    return (
      <Grid container spacing={5}>
        <Grid item sm={4} xs={12}>
          {loading ? (
            <p>Loading Conversations</p>
          ) : conversations[0] ? (
            <Paper className={classes.paper}>
              <Conversations
                className={classes.conversations}
                conversations={conversations}
                uid={this.getRequestedUID()}
              />
            </Paper>
          ) : (
            <p>No Conversations</p>
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {loading ? (
            <p>Loading Conversation</p>
          ) : conversation ? (
            <Paper className={classes.paper}>
              <Conversation
                className={classes.conversation}
                conversation={conversation}
                uid={uid}
              />
            </Paper>
          ) : (
            <p>No Conversation</p>
          )}
        </Grid>
      </Grid>
    );
  }
}

conversations.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getConversations: PropTypes.func.isRequired,
  getConversation: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, {
  getConversations,
  getConversation,
})(withStyles(styles)(conversations));
