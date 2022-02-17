import React, { Component, useState } from "react";
import { Grid, FormControl, FormLabel, TextField, Button } from '@material-ui/core';
import logo from '../layout/Logo.png'
import SocialPetApi from '../../api/SocialPetApi'

//import 'bcryptjs';
import { render } from "react-dom";

class Login extends Component {

    constructor(props) {
        super(props);
    
        // Init an empty state
        this.state = {
            currentAccount: null,
            currentAccountName: null,
            currentAccountPasswort: null,
            login: false,
            
            textFieldName: null,
            textFieldPasswort: null,
        };
    }

    getAccountById = () => {
		SocialPetApi.getAPI().getAccountById(1)
			.then(account =>
				this.setState({
                    currentAccount: account,
                    currentAccountName: account.name,
                    currentAccountPasswort: account.passwort,
					error: null,
					loadingInProgress: false,
				})).then(() => {
                    this.compareNameAndPW();
				}).catch(e =>
					this.setState({
                        currentAccount: null,
                        currentAccountName: null,
                        currentAccountPasswort: null,
						error: e,
						loadingInProgress: false,
					}));
			this.setState({
				error: null,
				loadingInProgress: true
			});
	}

    handleNameTextFieldChange = (e) => {
        this.setState({
            textFieldName: e.target.value
        });
    }

    handlePasswortTextFieldChange = (e) => {
        this.setState({
            textFieldPasswort: e.target.value
        });
    }

    compareNameAndPW = () => {
        if (this.state.currentAccountName === this.state.textFieldName && this.state.currentAccountPasswort === this.state.textFieldPasswort) {
            this.setState({
                login: true
            });
            sessionStorage.setItem('username', this.state.currentAccountName)
            window.location.reload()
        } else {
            alert("Falsche Anmeldedaten")
        }
    }

    render(){
        console.log(this.state.currentAccountName)
        console.log(this.state.currentAccountPasswort)
        console.log(this.state.textFieldName)
        console.log(this.state.textFieldPasswort)
        return(
            <div style={{ justifyContent: "center", textAlign: "center", paddingTop: "100px" }}>
                <img src={logo} alt="Pdf-Stampy" style={{ width: "350px", paddingBottom: "50px"}}/>
                <form>
                    <Grid style={{ margin: '10px' }}>
                        <FormControl>
                            <TextField value={this.state.textFieldName} onChange = { this.handleNameTextFieldChange } id="outlined-basic" label="Name" variant="outlined" />
                        </FormControl>
                    </Grid>
                    <Grid style={{ margin: '10px' }}>
                        <FormControl>
                            <TextField value={this.state.textFieldPasswort} onChange = { this.handlePasswortTextFieldChange } type="password" id="outlined-basic" label="Passwort" variant="outlined" />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <Button onClick = { this.getAccountById } variant="contained" style={{ backgroundColor: '#EDA900', borderRadius: '15px', margin: '20px' }}>Hier klicken</Button>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default Login;