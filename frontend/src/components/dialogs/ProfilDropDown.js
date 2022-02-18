import React from 'react';
import { Popover, Button } from '@material-ui/core';
import settings from '../resources/Settings.png';
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
    <div style={{ marginTop: '100px' }}>
      <Button aria-describedby={id} onClick={handleClick} style={{ }}> <img src={ settings } alt='settings' style={{ width : '40px' }}/></Button>
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
            <Button style={{ marginLeft: '40px', marginRight: '40px', marginBottom: '10px', color: '#EDA900'}} onClick={ logout }>Logout</Button>
        </div>
      </Popover>
    </div>
  );
}