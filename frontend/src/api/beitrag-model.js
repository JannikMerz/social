export default class Beitrag{

	constructor(aid, aerstellungszeit, ainhalt, aaccount){
		super();
        this.id = aid
        this.erstellungszeit = aerstellungszeit
        this.inhalt = ainhalt
        this.account = aaccount	
    }

	/**
	 * Gibt ein Array von KonversationBO aus einer gegebenen JSON-Struktur zurück
	 */
    static fromJSON(beitrag) {
		let results = null;
		if (Array.isArray(beitrag)) {
			results = [];
			beitrag.forEach((x) => {
				Object.setPrototypeOf(x, Beitrag.prototype);
				results.push(x);
			})
		} else {
			let x = beitrag;
			Object.setPrototypeOf(x, Beitrag.prototype);
			results = x;
		}
		return results;
	}
}