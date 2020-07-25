// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Redux
import { connect } from "react-redux";
import { getMatches } from "../redux/actions/dataActions";
// Material-UI
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// Components
import MatchItem from "../components/matches/MatchItem";
// 3rd Party
import { Scrollbars } from "react-custom-scrollbars";

const styles = (theme) => ({
  ...theme.spread,
  matchItem: {
    margin: "10px 0px 10px 0px",
  },
});

class matches extends Component {
  state = { errors: {} };
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
    const errors = this.state.errors;

    return (
      <Grid container spacing={5}>
        <Grid item sm={5} xs={12}>
          <Scrollbars style={{ maxHeight: 650 }} autoHeightMax={650} autoHeight>
            {loading ? (
              <p>Loading</p>
            ) : (
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
            )}
          </Scrollbars>
        </Grid>
        <Grid item sm={7} xs={12}>
          <p>Conversation</p>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps, { getMatches })(
  withStyles(styles)(matches)
);
