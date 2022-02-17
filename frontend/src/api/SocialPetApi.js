import Account from './accountModel';
import Beitrag from './beitragModel';

export default class SocialPetApi {

    // Singelton instance
    static #api = null;

    #socialPetAPIBaseURL = 'http://127.0.0.1:5000/backend'
    /**
     * Singleton Instanz erhalten
     * 
     * @public
     */
    static getAPI() {
      if (this.#api == null) {
        this.#api = new SocialPetApi();
      }
      return this.#api;
    }

    #fetchAdvanced = (url, init) => fetch(url, init, {credential: 'include'})
      .then(res => {
        // Das von fetch() zurückgegebene Promise wird bei einem HTTP-Fehlerstatus nicht zurückgewiesen, auch wenn die Antwort ein HTTP 404 oder 500 ist.
        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      }
      )

    #getAccountByIdURL = (id) => `${this.#socialPetAPIBaseURL}/account/${id}`;
    #getBeitraegeURL = () => `${this.#socialPetAPIBaseURL}/beitraege`;

    #postBeitragURL = () => `${this.#socialPetAPIBaseURL}/beitrag`;

    /**
       * Gibt einen Account mit bestimmter id zurück
       * 
       * @public
       */
     getAccountById(id) {
      return this.#fetchAdvanced(this.#getAccountByIdURL(id)).then((responseJSON) => {
        let account = Account.fromJSON(responseJSON);
        console.info(account);
        return new Promise(function (resolve) {
          resolve(account);
        })
      })
    }

    getBeitraege() {
      return this.#fetchAdvanced(this.#getBeitraegeURL()).then((responseJSON) => {
        let beitraege = Beitrag.fromJSON(responseJSON);
        console.info(beitraege);
        return new Promise(function (resolve) {
          resolve(beitraege);
        })
      })
    }

    postBeitrag(beitrag) {
      return this.#fetchAdvanced(this.#postBeitragURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(beitrag)
      })
    }
}