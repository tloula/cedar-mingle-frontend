// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../redux/actions/userActions";
// Material-UI
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Components
import EditSettings from "../profile/EditSettings";
import EditAccount from "../profile/EditAccount";
import Notifications from "../layout/Notifications";
import Messages from "../layout/Messages";
// Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";

const styles = (theme) => ({
  ...theme.spread,

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  centerButtons: {},
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

class Navbar extends Component {
  state = {
    anchorEl: false,
    mobileMoreAnchorEl: false,
    snackbarOpen: false,
    darkMode: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.edited) {
      this.setState({ snackbarOpen: true });
    }
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes, authenticated, toggleTheme } = this.props;
    const { snackbarOpen, anchorEl, mobileMoreAnchorEl } = this.state;

    let menuId = "primary-search-account-menu";
    let renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose} component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <EditSettings toggleTheme={toggleTheme} />
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <EditAccount />
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            this.handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    );

    let mobileMenuId = "primary-search-account-menu-mobile";
    let renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <Messages />
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <Notifications />
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    let menubar = (
      <>
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                className={classes.title}
                variant="h6"
                noWrap
                component={Link}
                to="/"
                style={{ color: "#FFF" }}
              >
                Cedar Mingle
              </Typography>
              <div className={classes.centerButtons}>
                {authenticated ? (
                  <>
                    <Button color="inherit" component={Link} to="/explore">
                      Explore
                    </Button>
                    <Button color="inherit" component={Link} to="/matches">
                      Matches
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/conversations"
                    >
                      Messages
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/login">
                      Login
                    </Button>
                    <Button color="inherit" component={Link} to="/signup">
                      Signup
                    </Button>
                  </>
                )}
              </div>
              {authenticated && (
                <>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Messages />
                    <Notifications />
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={this.menuId}
                      aria-haspopup="true"
                      onClick={this.handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={this.mobileMenuId}
                      aria-haspopup="true"
                      onClick={this.handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </div>
                </>
              )}
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleCloseSnackbar}
          message="Settings saved"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleCloseSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </>
    );
    return menubar;
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
});

const mapActionsToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Navbar));
