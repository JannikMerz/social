export default class SocialPetApi {

    // Singelton instance
    static #api = null;

    #socialPetAPIBaseURL = '/socialPet'
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

    //Personbezogen
    #getPersonenURL = () => `${this.#socialPetAPIBaseURL}/personen`;

    //Personenbezogene
    /**
       * Gibt alle Personen als BO zurück
       * 
       * @public
       */
    getPersonen() {
      return this.#fetchAdvanced(this.#getPersonenURL()).then((responseJSON) => {
        // console.info(customerBOs);
        return new Promise(function (resolve) {
          resolve();
        })           
      })
    }
}