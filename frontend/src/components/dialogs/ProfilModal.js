import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab, AppBar, Toolbar, Box, Popover, Button, Modal, IconButton, CloseIcon } from '@material-ui/core';
import SocialPetApi from '../../api/SocialPetApi'
import close from './Close.png'

class ProfilModal extends Component {

    constructor(props) {
        super(props);
    
        // Init an empty state
        this.state = {
          open: false,
          currentAccount: null,
          currentAccountName: props.user,
          currentAccountEmail: null,
        };
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    getAccountByName = () => {
        console.log(this.state.currentAccountName)
		SocialPetApi.getAPI().getAccountByName(this.state.currentAccountName)
			.then(account =>
				this.setState({
                    currentAccount: account,
                    currentAccountEmail: account.email,
					error: null,
					loadingInProgress: false,
				})).catch(e =>
					this.setState({
                        currentAccount: null,
                        currentAccountEmail: null,
						error: e,
						loadingInProgress: false,
					}));
			this.setState({
				error: null,
				loadingInProgress: true
			});
	}

    componentDidMount() {
		this.getAccountByName()
    }

  
    render() {
        const { open, currentAccount, currentAccountName, currentAccountEmail } = this.state;
        console.log(currentAccountEmail)
        return (
        <div>
            <Button onClick={this.handleOpen} style={{margin: '10px', marginLeft: '40px', marginRight: '40px'}}>Profil</Button>
            <Modal
            open={open}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: 400,
                backgroundColor: 'white',
                boxShadow: 24,
                padding: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={this.handleClose}>
                        <img src={ close } alt='settings' style={{ width : '20px' }}></img>
                    </Button>
                </div>
                <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: '20px' }}>
                    Hallo, { currentAccountName }!
                </Typography>
                <Typography id="modal-modal-description" style={{ mt: 2 }}>
                    E-Mail: { currentAccountEmail }
                </Typography>
            </Box>
            </Modal>
        </div>
        );
    }
  }
  export default ProfilModal;