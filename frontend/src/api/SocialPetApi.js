import Account from './accountModel';

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
}