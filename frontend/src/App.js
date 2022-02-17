import React from 'react';
import Header from './components/layout/Header';
import SocialPetApi from './api/SocialPetApi'
import { Container } from '@material-ui/core';

class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentAccount: null,
      currentAccountName: null
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

	/** Renders the whole app */
	render() {
		console.log(this.state.currentAccountName)
		return (
      <div>
        <Header></Header>
        <Container style={{ marginTop: '50px' }}>
          Neuen Beitrag erstellen:<br />
          <input type="text"></input><br />
          <button onClick={ this.getAccountById }>Klick mich</button>
        </Container>
      </div>
		);
	}
}

export default App;
