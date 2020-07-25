// React
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
// Components
import StaticProfile from "../components/profile/StaticProfile";
import ProfileSkeleton from "../util/ProfileSkeleton";
// API
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
  };
  componentDidMount() {
    const uid = this.props.match.params.uid;
    this.props.getUserData(uid);
  }
  render() {
    const {
      data: { profile },
      UI: { loading },
    } = this.props;

    return (
      <>{loading ? <ProfileSkeleton /> : <StaticProfile profile={profile} />}</>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

user.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getUserData })(user);
