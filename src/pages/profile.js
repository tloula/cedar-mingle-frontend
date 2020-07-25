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

profile.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(profile);
