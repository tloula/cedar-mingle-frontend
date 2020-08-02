// React
import PropTypes from "prop-types";
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
// Material-UI
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import LanguageIcon from "@material-ui/icons/Language";
import LocationOn from "@material-ui/icons/LocationOn";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
// Photo Gallery
import Gallery from "react-photo-gallery";
import FsLightbox from "fslightbox-react";
import { Scrollbars } from "react-custom-scrollbars";
// Misc
import dayjs from "dayjs";
// Components
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import ReportUser from "../misc/ReportUser";

const styles = (theme) => ({
  ...theme.spread,
});

class StaticProfile extends Component {
  state = {
    toggler: false,
    slide: 0,
  };

  handlePhotoSelect = (index) => {
    this.setState({ toggler: !this.state.toggler, slide: index });
  };

  render() {
    const { toggler, slide } = this.state;
    const {
      classes,
      profile: {
        about,
        age,
        hometown,
        images,
        interests,
        major,
        name,
        occupation,
        uid,
        website,
        year,
      },
      UI: { loading },
    } = this.props;

    let profileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <Scrollbars
              style={{ maxHeight: 650 }}
              autoHeightMax={650}
              autoHeight
              autoHide
            >
              {images && (
                <>
                  <Gallery
                    photos={images}
                    onClick={(event, photo) =>
                      this.handlePhotoSelect(photo.index)
                    }
                    margin={0}
                  />
                  <FsLightbox
                    toggler={toggler}
                    slide={slide + 1}
                    sources={images && images.map((img) => img.src)}
                    type="image"
                  />
                </>
              )}
            </Scrollbars>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.rightGrid}>
            <div className={classes.profile}>
              <Typography variant="h4" color="primary">
                <span>{name}</span>
                <span>{age && ", " + age}</span>
              </Typography>
              <hr />
              {about && (
                <Typography variant="body2" className={classes.profileItem}>
                  {about}
                </Typography>
              )}
              <div className="profileItems">
                {major && (
                  <Typography variant="body2" className={classes.profileItem}>
                    <SchoolIcon color="primary" />{" "}
                    <span>
                      {major}, Class of {dayjs(year).format("YYYY")}
                    </span>
                  </Typography>
                )}
                {occupation && (
                  <Typography variant="body2" className={classes.profileItem}>
                    <WorkIcon color="primary" /> <span>{occupation}</span>
                  </Typography>
                )}
                {hometown && (
                  <Typography variant="body2" className={classes.profileItem}>
                    <LocationOn color="primary" /> <span>From {hometown}</span>
                  </Typography>
                )}
                {website && (
                  <Typography variant="body2" className={classes.profileItem}>
                    <LanguageIcon color="primary" />{" "}
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {" "}
                      {website}
                    </a>
                  </Typography>
                )}
              </div>
              <div className="interests">
                {interests &&
                  interests.map((interest, index) => (
                    <Chip
                      key={interest}
                      label={interest}
                      color="primary"
                      className="interest"
                    />
                  ))}
                <div className="profileButtons">
                  <div style={{ float: "right" }}>
                    <ReportUser uid={uid} name={name} />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

StaticProfile.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(StaticProfile));
