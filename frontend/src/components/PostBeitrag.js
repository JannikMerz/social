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

    postBeitrag = async () => {
        let beitrag = new Beitrag(1, 0, this.state.titel, this.state.inhalt, 1 /* account.id */)
        await SocialPetApi.getAPI().postBeitrag(beitrag);
        this.setState({
            titel: '',
            inhalt: ''
        });
        this.props.loadBeitraege();
    }


    componentDidMount() {
    }



    /** Renders the component */
    render() {
        const { titel, inhalt } = this.state;
        return (
            <Card style={{ marginTop: '75px', marginBottom: '50px' }}>
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
                    </Stack>
                    <div style={{ display: "flex" }}>

                        <Button style={{ marginTop: '20px', marginLeft: "auto" }} onClick={this.postBeitrag}>Abschicken</Button>
                    </div>

                </div>
            </Card>
        );
    }
}

export default PostBeitrag;