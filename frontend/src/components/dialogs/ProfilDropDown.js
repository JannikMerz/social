import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab, AppBar, Toolbar, Box, Popover, Button } from '@material-ui/core';
import settings from './Settings.png';
import ProfilModal from './ProfilModal.js'

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    sessionStorage.clear()
    window.location.reload()
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} style={{ }}> <img src={ settings } alt='settings' style={{ width : '50px' }}/></Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div>
            <ProfilModal user={ props.currentAccountName }></ProfilModal>
        </div>
        <div>
            <Button style={{margin: '10px', marginLeft: '40px', marginRight: '40px'}} onClick={ logout }>Logout</Button>
        </div>
      </Popover>
    </div>
  );
}