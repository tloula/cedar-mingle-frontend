// React
import PropTypes from "prop-types";
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { deleteImage, uploadImage } from "../../redux/actions/userActions";
// Material-UI
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
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
import EditDetails from "./EditDetails";
import MyButton from "../../util/MyButton";
import ProfileSkeleton from "../../util/ProfileSkeleton";
// Helpers
import { age } from "../../util/helpers";
// Blob reducer for photo upload
const reduce = require("image-blob-reduce")();

const styles = (theme) => ({
  ...theme.spread,
});

class Profile extends Component {
  state = {
    toggler: false,
    slide: 0,
    deletePhotos: false,
  };

  // Open new photo uploader
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  // Upload new photo
  handleImageChange = (event) => {
    const file = event.target.files[0];
    // Downsize image
    reduce.toBlob(file, { max: 1000 }).then((blob) => {
      blob.lastModifiedDate = new Date();
      blob.name = file.name;
      const formData = new FormData();
      formData.append("image", blob, file.name);
      this.props.uploadImage(formData);
    });
  };
  // Photo selected
  handlePhotoSelect = (mode, image, index) => {
    if (mode) {
      // Delete photo
      this.props.deleteImage({ image });
    } else {
      // Open Lightbox
      this.setState({ toggler: !this.state.toggler, slide: index });
    }
  };
  // Toggle photo deletion option
  toggleDeletePhotos = (event) => {
    this.setState({ deletePhotos: !this.state.deletePhotos });
  };

  render() {
    const { toggler, slide, deletePhotos } = this.state;
    const {
      classes,
      user: {
        profile: {
          about,
          birthday,
          created,
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
        uploading,
        authenticated,
      },
      UI: { loading },
    } = this.props;

    let imgSrcs = [];
    let imgTmps = [];

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
              {images.forEach((img) => {
                imgSrcs.push(img.src);
                // Created imgTmps b/c Gallery was messing with the size properties which are needed for delete
                imgTmps.push({
                  src: img.src,
                  width: img.width,
                  height: img.height,
                });
              })}
              <Gallery
                photos={imgTmps}
                onClick={(event, photo) =>
                  this.handlePhotoSelect(
                    deletePhotos,
                    images[photo.index],
                    photo.index
                  )
                }
                margin={0}
              />
              <FsLightbox
                toggler={toggler}
                slide={slide + 1}
                sources={imgSrcs}
                type="image"
              />
            </Scrollbars>
          </Grid>
          <Grid item sm={6} xs={12} style={{ padding: "40px" }}>
            <div className={classes.profile}>
              <Typography variant="h4" color="primary">
                <span>{name}</span>
                <span>{birthday && ", " + age(birthday)}</span>
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
              </div>
              <div className="profileButtons">
                {" "}
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                {uploading && <CircularProgress tip="Uploading" />}
                {!uploading && (
                  <MyButton
                    tip="Add Photos"
                    onClick={this.handleEditPicture}
                    btnClassName={classes.button}
                  >
                    <AddIcon color="primary" />
                  </MyButton>
                )}
                {deletePhotos && (
                  <Chip
                    icon={<DeleteIcon />}
                    label="Select Photo to Remove"
                    onDelete={this.toggleDeletePhotos}
                    color="primary"
                  />
                )}
                {!deletePhotos && (
                  <MyButton
                    tip="Remove Photos"
                    onClick={this.toggleDeletePhotos}
                    btnClassName={classes.button}
                  >
                    <DeleteIcon color="primary" />
                  </MyButton>
                )}
                <EditDetails />
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

const mapActionsToProps = { uploadImage, deleteImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
