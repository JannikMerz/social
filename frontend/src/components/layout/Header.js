import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../resources/Logo.png';
import ProfileDropDown from '../dialogs/ProfilDropDown';
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

    return (
    <div style={{ width: '100%'}}>
      <AppBar style={{ backgroundColor: '#FFF0CA', height: '150px', justifyContent: 'center', alignItems: 'center', marginBottom: '200px'}}>
      <Toolbar>
        <img src={logo} alt="Social Pet" style={{ width : '300px', margin: '50px'}}/>

        </Toolbar>
        </AppBar>
      <Toolbar />
      </div>
    )
  }
}

export default Header;