import React, { Component } from 'react';
import { Typography, Button, Modal, Card, CardHeader, Avatar } from '@material-ui/core';
import SocialPetApi from '../../api/SocialPetApi'
import close from '../resources/Close.png'

class OtherProfilModal extends Component {

    constructor(props) {
        super(props);
    
        // Init an empty state
        this.state = {
          open: false,
          currentAccount: null,
          currentAccountName: props.user,
          currentAccountEmail: null,
          currentAccountImg: null
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
                    currentAccountImg: account.img,
					error: null,
					loadingInProgress: false,
				})).catch(e =>
					this.setState({
                        currentAccount: null,
                        currentAccountEmail: null,
                        currentAccountImg: null,
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
        this.handleOpen()
    }

  
    render() {
        const { open, currentAccountName, currentAccountEmail, currentAccountImg, image } = this.state;
        console.log(currentAccountImg)
        console.log(image)
        return (
        <div>

            <Modal
            open={open}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Card style={{ 
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

            <CardHeader
                avatar={
                    <Avatar style={{ backgroundColor: 'red', width: '60px', height: '60px', fontSize: '30px' }} >
                        {currentAccountName.charAt(0)}
                    </Avatar>
                } style={{  marginLeft: '38%' }}
            />

                <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: '20px' }}>
                    Profil von { currentAccountName }
                </Typography>
                <Typography id="modal-modal-description" style={{ mt: 2, marginBottom: '40px' }}>
                    E-Mail: { currentAccountEmail }
                    
                </Typography>
            </Card>
            </Modal>
            
        </div>
        );
    }
  }
  export default OtherProfilModal;