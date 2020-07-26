import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

class home extends Component {
  componentDidMount() {}
  render() {
    const { loading } = this.props.UI;
    return (
      <>
        <p>Home Page</p>
      </>
    );
  }
}

home.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps)(home);
