// React
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
// Helpers
import Image from "material-ui-image";

const styles = (theme) => ({
  ...theme.spread,
});

class home extends Component {
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    return <p>Home</p>;
  }
}

home.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(home));
