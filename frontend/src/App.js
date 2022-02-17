import React from 'react';
import Header from './components/layout/Header';
import SocialPetApi from './api/SocialPetApi'
import { Container, Card, Typography } from '@material-ui/core';
import Login from './components/pages/Login'
import BeitragListe from './components/BeitragListe'
import PostBeitrag from './components/PostBeitrag'

class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		this.child = React.createRef();

		// Init an empty state
		this.state = {
			currentAccount: null,
      		currentAccountName: null,
			
		};
	}
	//aktuell eingeloggten Student vom Backend abfragen
	
	getAccountById = () => {
		SocialPetApi.getAPI().getAccountById(1)
			.then(account =>
				this.setState({
					currentAccount: account,
          currentAccountName: account.name,
					error: null,
					loadingInProgress: false,
				}))
				.catch(e =>
					this.setState({
						currentAccount: null,
						error: e,
						loadingInProgress: false,
					}));
			this.setState({
				error: null,
				loadingInProgress: true
			});
	}

	loadBeitraege = () => {
		this.child.current.getBeitraege();
	}

	/** Renders the whole app */
	render() {
		console.log(this.state.currentAccountName)
		return (
      <div>
        <Header></Header>
        <Container maxWidth='md' style={{ marginTop: '50px' }}>
			<PostBeitrag loadBeitraege={this.loadBeitraege}></PostBeitrag>
			<BeitragListe ref={this.child}></BeitragListe>
        </Container>
      </div>
		);
	}
}

export default App;
