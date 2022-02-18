import React from 'react';
import Header from './components/layout/Header';
import { Container } from '@material-ui/core';
import Login from './components/pages/Login'
import background from './Background.png'
import BeitragListe from './components/BeitragListe'
import PostBeitrag from './components/PostBeitrag'
import ProfileDropDown from './components/dialogs/ProfilDropDown';

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
    const { currentAccountName } = this.state;
		console.log(this.state.currentAccountName)
		return (
      <div style={{
        backgroundImage: `url(${background})`,
        height: '100%'
        }}>
        {
        currentAccountName ?
          <div>
            <Header currentAccountName={ currentAccountName }></Header>
            <Container maxWidth='md' style={{ alignItems: 'right', width: '800px'}}>
              <ProfileDropDown currentAccountName={ currentAccountName } style={{ alignItems: 'right'}}></ProfileDropDown>

              <PostBeitrag loadBeitraege={this.loadBeitraege} currentAccountName={currentAccountName}></PostBeitrag>
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
