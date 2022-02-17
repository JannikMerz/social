import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper'

import SocialPetApi from '../api/SocialPetApi';
import BeitragListeEintrag from './BeitragListEintrag'


class BeitragListe extends Component {

  constructor(props) {
    super(props);

    //initiiere einen leeren state
    this.state = {
        beitraege: [],
        error: null,
        loadingInProgress: false,
    };
  }

  getBeitraege = () => {
    SocialPetApi.getAPI().getBeitraege()
    .then(beitraege =>
        this.setState({
            beitraege: beitraege,
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                module: [],
                error: e,
                loadingInProgress: false,
            }));
    this.setState({
        error: null,
        loadingInProgress: true,
    });
}



  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
      this.getBeitraege();
  }



  /** Renders the component */
  render() {
    const { beitraege } = this.state;

    return (
      <div>
                {
                beitraege.map(beitrag => 
                    <BeitragListeEintrag key={beitrag.id} beitrag={beitrag} ></BeitragListeEintrag>)
                }
      </div>
    );
  }
}

export default BeitragListe;