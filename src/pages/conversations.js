// React
import { Link } from "react-router-dom";
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
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// Components
import Conversations from "../components/messages/Conversations";
import Conversation from "../components/messages/Conversation";
import ConversationsSkeleton from "../components/skeletons/ConversationsSkeleton";
import ConversationSkeleton from "../components/skeletons/ConversationSkeleton";

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
      UI: { loading },
    } = this.props;

    return (
      <Grid container spacing={4}>
        <Grid item md={4} sm={12}>
          {loading ? (
            <ConversationsSkeleton />
          ) : conversations[0] ? (
            <Paper className={classes.paper}>
              <Conversations
                className={classes.conversations}
                conversations={conversations}
                uid={this.getRequestedUID()}
              />
            </Paper>
          ) : (
            <Paper className={classes.paper}>
              <Alert severity="info" className={classes.alert}>
                Looks like you don't have any conversations yet, go start a new
                conversation from your <Link to="/matches">matches</Link> page!
              </Alert>
            </Paper>
          )}
        </Grid>
        <Grid item md={8} sm={12}>
          {loading ? (
            <Paper className={classes.paper} style={{ padding: "25px" }}>
              <ConversationSkeleton />
            </Paper>
          ) : conversation ? (
            <Paper
              className={classes.paper}
              style={{ padding: "25px", overflow: "hidden" }}
            >
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
