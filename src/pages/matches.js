// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Redux
import { connect } from "react-redux";
import { getMatches, getConversations } from "../redux/actions/dataActions";
// Material-UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// Components
import MatchItem from "../components/matches/MatchItem";
// 3rd Party
import { Scrollbars } from "react-custom-scrollbars";
import Conversations from "../components/matches/Conversations";

const styles = (theme) => ({
  ...theme.spread,
  matchItem: {
    margin: "10px 0px 10px 0px",
  },
});

class matches extends Component {
  componentDidMount() {
    this.props.getMatches();
    this.props.getConversations();
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
      data: { matches, conversations },
      UI: { loading, errors },
    } = this.props;

    return (
      <Grid container spacing={5}>
        <Grid item sm={4} xs={12}>
          <Scrollbars style={{ maxHeight: 650 }} autoHeightMax={650} autoHeight>
            {loading ? (
              <p>Loading Matches</p>
            ) : matches[0] ? (
              matches
                .sort(function (x, y) {
                  return x.created < y.created;
                })
                .map((match) => (
                  <MatchItem
                    className={classes.matchItem}
                    key={match.uid}
                    match={match}
                  />
                ))
            ) : (
              <p>No matches found, get exploring!</p>
            )}
          </Scrollbars>
        </Grid>
        <Grid item sm={4} xs={12}>
          {loading ? (
            <p>Loading Conversations</p>
          ) : conversations[0] ? (
            <Paper className={classes.paper}>
              <Conversations
                className={classes.conversations}
                conversations={conversations}
              />
            </Paper>
          ) : (
            <p>No Conversations</p>
          )}
        </Grid>
        <Grid item sm={4} xs={12}></Grid>
      </Grid>
    );
  }
}

matches.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getMatches: PropTypes.func.isRequired,
  getConversations: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, { getMatches, getConversations })(
  withStyles(styles)(matches)
);
