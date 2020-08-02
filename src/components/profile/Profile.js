// React
import PropTypes from "prop-types";
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  deleteImage,
  uploadImage,
  rearrangeImage,
} from "../../redux/actions/userActions";
// Material-UI
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Speed Dial
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloudIcon from "@material-ui/icons/Cloud";
import DeleteIcon from "@material-ui/icons/Delete";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOn from "@material-ui/icons/LocationOn";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
// Photo Gallery
import Gallery from "react-photo-gallery";
import Photo from "./Photo";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import FsLightbox from "fslightbox-react";
import { Scrollbars } from "react-custom-scrollbars";
// Misc
import dayjs from "dayjs";
// Components
import EditDetails from "./EditDetails";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
// Helpers
import { age } from "../../util/helpers";

// Blob reducer for photo upload
const reduce = require("image-blob-reduce")();

const styles = (theme) => ({
  ...theme.spread,

  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  alert: {
    width: "75%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
});

const LIGHTBOX = "LIGHTBOX";
const DELETE = "DELETE";

const SortablePhoto = SortableElement(
  ({ photoIndex, direction, margin, photo, onClick }) => (
    <Photo
      index={photoIndex}
      direction={direction}
      margin={margin}
      photo={photo}
      onClick={(event, { photo, index }) => {
        onClick(index);
      }}
    />
  )
);

class Profile extends Component {
  state = {
    toggler: false,
    slide: 0,
    images: [],
    originalImages: [],
    galleryMode: LIGHTBOX,
    speedDialOpen: false,
    lines: [],
  };

  // So these three functions are weird...
  // Basically some image component will fail if any of them are removed
  // Also, the gallery component kept resizing images
  //    and setState was modifiying the props with the new image dimensions
  //    this breaks the delete image route because we need the original sizes
  //    the JSON.parse(JSON.stringify()) creates a deep copy of the images array
  componentWillReceiveProps() {
    if (this.props.user.profile.images) {
      let images = JSON.parse(JSON.stringify(this.props.user.profile.images));
      let originalImages = JSON.parse(
        JSON.stringify(this.props.user.profile.images)
      );
      this.setState({ images, originalImages });
      if (this.props.user.profile.about)
        this.setState({ lines: this.props.user.profile.about.split("\n") });
    }
  }

  componentDidMount() {
    if (this.props.user.profile.images) {
      let images = JSON.parse(JSON.stringify(this.props.user.profile.images));
      let originalImages = JSON.parse(
        JSON.stringify(this.props.user.profile.images)
      );
      this.setState({ images, originalImages });
      this.setState({ lines: this.props.user.profile.about.split("\n") });
    }
  }

  componentWillMount() {
    if (this.props.user.profile.images) {
      let images = JSON.parse(JSON.stringify(this.props.user.profile.images));
      let originalImages = JSON.parse(
        JSON.stringify(this.props.user.profile.images)
      );
      this.setState({ images, originalImages });
      this.setState({ lines: this.props.user.profile.about.split("\n") });
    }
  }

  onSortEnd = (oldIndex, newIndex) => {
    if (oldIndex === newIndex) return;
    this.setState({ images: arrayMove(this.state.images, oldIndex, newIndex) });
    this.setState({
      originalImages: arrayMove(this.state.originalImages, oldIndex, newIndex),
    });
    this.props.rearrangeImage(this.state.originalImages);
  };

  handlePhotoSelect = (index) => {
    if (this.state.galleryMode === DELETE) {
      // Remove photo from server
      this.props.deleteImage(this.state.originalImages[index]);

      // Remove photo from client
      this.state.images.splice(index, 1);
      this.state.originalImages.splice(index, 1);

      this.setState({ galleryMode: LIGHTBOX });
    } else if (this.state.galleryMode === LIGHTBOX) {
      // Open Lightbox
      this.setState({ toggler: !this.state.toggler, slide: index });
    }
  };

  handleDeletePhoto = () => {
    this.setState({ galleryMode: DELETE });
  };

  handleCancelDeletePhoto = () => {
    this.setState({ galleryMode: LIGHTBOX });
  };

  handleUploadPhoto = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handlePhotoLimitAlertClose = () => {
    this.setState({ errors: {} });
  };

  handleClose = () => {
    this.setState({ speedDialOpen: false });
  };

  handleOpen = () => {
    this.setState({ speedDialOpen: true });
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

  SortableGallery = SortableContainer(({ items, onClick }) => (
    <Gallery
      photos={items}
      margin={0}
      renderImage={(props) => (
        <SortablePhoto
          index={props.index}
          key={props.index}
          photoIndex={props.index}
          direction={props.direction}
          margin={props.margin}
          photo={props.photo}
          onClick={(index) => onClick(index)}
        />
      )}
    />
  ));

  render() {
    const {
      toggler,
      slide,
      galleryMode,
      speedDialOpen,
      images,
      lines,
    } = this.state;
    const {
      classes,
      user: {
        profile: {
          about,
          birthday,
          dream,
          hometown,
          interests,
          major,
          name,
          occupation,
          website,
          year,
        },
      },
      UI: { loading, loadingSecondary },
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
              <this.SortableGallery
                items={images}
                onSortEnd={({ oldIndex, newIndex }) => {
                  this.onSortEnd(oldIndex, newIndex);
                }}
                axis={"xy"}
                distance={10}
                onClick={(index) => {
                  this.handlePhotoSelect(index);
                }}
              />
              <FsLightbox
                toggler={toggler}
                slide={slide + 1}
                sources={images.map((img) => img.src)}
                type="image"
              />
            </Scrollbars>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.rightGrid}>
            <div className={classes.profile}>
              <Typography variant="h4" color="primary">
                <span>{name}</span>
                <span>{birthday && ", " + age(birthday)}</span>
              </Typography>
              <hr />
              {about &&
                lines.map((line) => (
                  <Typography
                    key={Math.floor(Math.random() * 1000 + 1)}
                    variant="body2"
                    className={classes.profileItem}
                  >
                    {line}
                  </Typography>
                ))}
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
                {dream && (
                  <Typography variant="body2" className={classes.profileItem}>
                    <CloudIcon color="primary" /> <span>{dream}</span>
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
                {loadingSecondary && (
                  <Tooltip placement="top" title="Uploading Photo">
                    <CircularProgress
                      size={30}
                      className={classes.button}
                      style={{ verticalAlign: "middle" }}
                    />
                  </Tooltip>
                )}
                {galleryMode === DELETE && (
                  <Chip
                    icon={<DeleteIcon />}
                    label="Select Photo to Remove"
                    onDelete={this.handleCancelDeletePhoto}
                    color="primary"
                  />
                )}
                <div className={classes.root}>
                  <div className={classes.exampleWrapper}>
                    <SpeedDial
                      ariaLabel="SpeedDial example"
                      className={classes.speedDial}
                      hidden={false}
                      icon={<SpeedDialIcon />}
                      onClose={this.handleClose}
                      onOpen={this.handleOpen}
                      open={speedDialOpen}
                      direction={"left"}
                    >
                      <SpeedDialAction
                        icon={<EditDetails />}
                        tooltipTitle={"Edit Profile"}
                        tooltipPlacement={"bottom"}
                      />
                      <SpeedDialAction
                        icon={<AddIcon />}
                        tooltipTitle={
                          images.length < 8
                            ? "Upload Photo"
                            : "You may only upload 8 photos"
                        }
                        tooltipPlacement={"bottom"}
                        onClick={() => {
                          this.handleUploadPhoto();
                        }}
                        disabled={images.length >= 8}
                      />
                      <SpeedDialAction
                        icon={<DeleteIcon />}
                        tooltipTitle={"Delete Photo"}
                        tooltipPlacement={"bottom"}
                        onClick={() => {
                          this.handleDeletePhoto();
                        }}
                      />
                    </SpeedDial>
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

const mapActionsToProps = { uploadImage, deleteImage, rearrangeImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  rearrangeImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
