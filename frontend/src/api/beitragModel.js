export default class Beitrag{

	constructor(aid, adatum, atitel, ainhalt, aaccount){
        this.id = aid
        this.datum = adatum
		this.titel = atitel
        this.inhalt = ainhalt
        this.accountId = aaccount	
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