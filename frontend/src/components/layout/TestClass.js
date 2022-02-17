import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab, AppBar, Toolbar, Box, Popover, Button } from '@material-ui/core';

class TestClass extends Component {

    constructor(props) {
        super(props);
        // Init an empty state
        this.state = {
            anchorEl: null,
            open: false
        };
      }

  handleClick = (e) => {
    this.setState({
        anchorEl: e.currentTarget,
        open: true
    })
  };

  handleClose = () => {
    this.setState({
        anchorEl: null
    })
  };

  render() {
    const { open, anchorEl } = this.state;

    return (
        <div>
        <Button aria-describedby='simple-popover' variant="contained" onClick={this.handleClick()}>
            Open Popover
        </Button>
        <Popover
            id='simple-popover'
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose()}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
        >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
        </div>
    );    
}
}

export default TestClass;