// React
import { Link } from "react-router-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Redux
import { connect } from "react-redux";
import { getMatches } from "../redux/actions/dataActions";
// Material-UI
import Alert from "@material-ui/lab/Alert";
// Components
import MatchItem from "../components/matches/MatchItem";
import MatchItemSkeleton from "../components/skeletons/MatchItemSkeleton";

const styles = (theme) => ({
  ...theme.spread,
  matchItem: {},
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "15px",
  },
});

class matches extends Component {
  componentDidMount() {
    this.props.getMatches();
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
      data: { matches },
      UI: { loading },
    } = this.props;

    return loading ? (
      <div className={classes.container}>
        <MatchItemSkeleton className={classes.matchItem} />
        <MatchItemSkeleton className={classes.matchItem} />
        <MatchItemSkeleton className={classes.matchItem} />
        <MatchItemSkeleton className={classes.matchItem} />
        <MatchItemSkeleton className={classes.matchItem} />
        <MatchItemSkeleton className={classes.matchItem} />
      </div>
    ) : matches[0] ? (
      <div className={classes.container}>
        {matches
          .sort(function (x, y) {
            return x.created < y.created;
          })
          .map((match) => (
            <MatchItem
              className={classes.matchItem}
              key={match.uid}
              match={match}
            />
          ))}
      </div>
    ) : (
      <Alert severity="info" className={classes.alert}>
        Looks like you don't have any matches yet, start{" "}
        <Link to="/explore">exploring</Link> to find someone new!
      </Alert>
    );
  }
}

matches.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getMatches: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, {
  getMatches,
})(withStyles(styles)(matches));
