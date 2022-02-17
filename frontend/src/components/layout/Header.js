import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab, AppBar, Toolbar, Box } from '@material-ui/core';
import logo from './SocialPetLogo.png';
// import { Link as RouterLink } from 'react-router-dom';
// import ProfileDropDown from '../dialogs/ProfileDropDown';

class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
 handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const { user, currentPerson } = this.props;

    return (
    <div style={{ width: '100%'}}>
      <AppBar style={{ backgroundColor: '#8b4500'}}>
        <Toolbar>
            <img src={logo} alt="Social Pet" style={{ width : 150, margin: 5}}/>
        </Toolbar>
      </AppBar>
      <Toolbar />
      </div>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /** The logged in firesbase currentPerson */
  currentPerson: PropTypes.object,
}

export default Header;