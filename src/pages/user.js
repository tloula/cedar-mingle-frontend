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
      data: { profile, loading },
    } = this.props;

    return (
      <>{loading ? <ProfileSkeleton /> : <StaticProfile profile={profile} />}</>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
