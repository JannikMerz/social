import React from 'react';
import Header from './components/layout/Header';
import SocialPetApi from './api/SocialPetApi'
import { Container, Card, Typography } from '@material-ui/core';
import Login from './components/pages/Login'
import Test from './components/dialogs/ProfilDropDown.js'


class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
      currentAccountName: null
		};
	}

  getSessionStorage = () => {
    if (sessionStorage.getItem('username')){
      this.setState({
        currentAccountName: sessionStorage.getItem('username'),
        loggedIn: true
      });
    } else {
      this.setState({
        currentAccountName: null,
        loggedIn: false
      });
    }
  }

	// //aktuell eingeloggten Student vom Backend abfragen
	
	// getAccountById = () => {
	// 	SocialPetApi.getAPI().getAccountById(1)
	// 		.then(account =>
	// 			this.setState({
	// 				currentAccount: account,
  //         currentAccountName: account.name,
	// 				error: null,
	// 				loadingInProgress: false,
	// 			}))
	// 			.catch(e =>
	// 				this.setState({
	// 					currentAccount: null,
	// 					error: e,
	// 					loadingInProgress: false,
	// 				}));
	// 		this.setState({
	// 			error: null,
	// 			loadingInProgress: true
	// 		});
	// }

  componentDidMount() {
		this.getSessionStorage()
  }

	/** Renders the whole app */
	render() {
    const { currentAccount, currentAccountName } = this.state;
		console.log(this.state.currentAccountName)
		return (
      <div>
        {
        currentAccountName ?
          <div>
            <Header currentAccountName={ currentAccountName }></Header>
              <Container style={{ marginTop: '50px' }}>
                <Card style={{ height: '300px', marginBottom: '50px' }}>
                  <Typography style={{ margin: '10px' }}>Hier Beitrag erstellen</Typography>
                </Card>
                <Card>
                  <Typography style={{ margin: '10px' }}>Hier Feed</Typography>
                </Card>
              </Container>              

          </div>

        :
          <Login></Login>
        }

        
      </div>
		);
	}
}

export default App;
