// React
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
// Components
import Profile from "../components/profile/Profile";

class profile extends Component {
  render() {
    return <Profile />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

profile.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(profile);
