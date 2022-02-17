export default class Account{

	constructor(aid, aname, amail, apasswort){
		super();
        this.id = aid
        this.name = aname
        this.mail = amail
        this.passwort = apasswort	
    }

	/**
	 * Gibt ein Array von KonversationBO aus einer gegebenen JSON-Struktur zurück
	 */
    static fromJSON(account) {
		let results = null;
		if (Array.isArray(account)) {
			results = [];
			account.forEach((x) => {
				Object.setPrototypeOf(x, Account.prototype);
				results.push(x);
			})
		} else {
			let x = account;
			Object.setPrototypeOf(x, Account.prototype);
			results = x;
		}
		return results;
	}
}