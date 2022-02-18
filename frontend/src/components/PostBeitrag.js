import React, { Component } from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Stack } from '@mui/material';
import { Card } from '@mui/material';
import { Grid } from '@material-ui/core';

import SocialPetApi from '../api/SocialPetApi';
import Beitrag from '../api/beitragModel';


class PostBeitrag extends Component {

    constructor(props) {
        super(props);

        //initiiere einen leeren state
        this.state = {
            titel: '',
            inhalt: '',
            image: null,
            currentAccountName: props.currentAccountName,
            accId: null,
            error: null,
            loadingInProgress: false,
        };
    }

    titelValueChange = event => {
        const value = event.target.value;
        this.setState({
            titel: value
        });
    }
    inhaltValueChange = event => {
        const value = event.target.value;
        this.setState({
            inhalt: value
        });
    }
    imageValueChange = event => {
        const value = event.target.value;
        this.setState({
            image: value
        });
    }


    postBeitrag = async () => {
        console.log(this.state.accId)
        let beitrag = new Beitrag(1, 0, this.state.titel, this.state.inhalt, this.state.image,  this.state.accId)
        await SocialPetApi.getAPI().postBeitrag(beitrag);
        this.setState({
            titel: '',
            inhalt: '',
            image: ''
        });
        this.props.loadBeitraege();
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          this.setState({
            image: URL.createObjectURL(event.target.files[0])
          });
        }
       }

    getAccountByName = () => {
        console.log(this.state.currentAccountName)
		SocialPetApi.getAPI().getAccountByName(this.state.currentAccountName)
			.then(account =>
				this.setState({
                    accId: account.id,
					error: null,
					loadingInProgress: false,
				})).catch(e =>
					this.setState({
                        accId: null,
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



    /** Renders the component */
    render() {
        const { titel, inhalt, image } = this.state;
        console.log(this.state.image)
        return (
            <Card style={{ marginTop: '20px', marginBottom: '50px' }}>
                <div style={{ margin: '25px' }}>
                    <Stack spacing={2}>
                        <Typography>Erstelle einen Post</Typography>
                        <TextField
                            label='Titel'
                            value={titel}

                            variant="outlined" a
                            onChange={this.titelValueChange} />
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            label='Schreibe hier Deinen Beitrag'
                            value={inhalt}
                            variant="outlined"
                            onChange={this.inhaltValueChange} />
                        <TextField
                            label='Lade hier deine Bild-URL hoch'
                            value={image}

                            variant="outlined" a
                            onChange={this.imageValueChange} />
                    </Stack>

                
                    <div style={{ display: "flex" }}>

                        <Button style={{ marginTop: '20px', marginLeft: "auto", backgroundColor: '#EDA900', color: 'white' }} onClick={this.postBeitrag}>Abschicken</Button>
                    </div>

                </div>
            </Card>
        );
    }
}

export default PostBeitrag;