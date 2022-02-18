import React from 'react';
import Header from './components/layout/Header';
import SocialPetApi from './api/SocialPetApi'
import { Container, Card, Typography } from '@material-ui/core';
import Login from './components/pages/Login'
import Test from './components/dialogs/ProfilDropDown.js'

import BeitragListe from './components/BeitragListe'
import PostBeitrag from './components/PostBeitrag'

class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		this.child = React.createRef();

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

  componentDidMount() {
		this.getSessionStorage()
  }

	loadBeitraege = () => {
		this.child.current.getBeitraege();
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
			<Container maxWidth='md' style={{ marginTop: '50px' }}>
			<PostBeitrag loadBeitraege={this.loadBeitraege}></PostBeitrag>
			<BeitragListe ref={this.child}></BeitragListe>
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
