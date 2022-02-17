import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, withStyles, Typography, Paper, Button, Grid, Divider } from '@material-ui/core';
import settings from './Settings.png';

class ProfileDropDown extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      open: false,
    }
  }

  /** Handles click events on the avatar button and toggels visibility */
  handleAvatarButtonClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  /** 
   * Handles click events from the ClickAwayListener.
   */
  handleClose = () => {
    this.setState({
      open: false
    });
  }

  /** 
	 * Handles the click event of the sign in button and uses the firebase.auth() component to sign in.
	 */
  handleSignOutButtonClicked = () => {
    
  }

  /** 
	 * Handles the click event of the sign in button and uses the firebase.auth() component to sign in.
	 */
  handleLöschenButtonClicked = () => {
    
  }


  /** Renders the profile drop down if a loggin user is given as a prop */
  render() {
    const { classes, user } = this.props;
    const { open } = this.state;

    return (
      <div></div>
    )
  }
}

/** Component specific styles */
const styles = theme => ({
  avatarButton: {
    float: 'right'
  },
  divider: {
    margin: theme.spacing(1),
  },
  profileBox: {
    padding: theme.spacing(1),
    background: theme.palette.background.default,
  }
});

/** PropTypes */
ProfileDropDown.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default ProfileDropDown;