from service.mapper import Mapper
from model.beitragModel import Beitrag


class BeitragService(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_id(self, id):
        pass

    def find_all(self):
        result = []

        cursor = self._connection.cursor()

        cursor.execute("SELECT * from beitrag ORDER BY datum DESC LIMIT 50")
        tuples = cursor.fetchall()

        for (idBeitrag, titel, inhalt, datum, img, accountId) in tuples:
            beitrag = Beitrag()
            beitrag._id = idBeitrag
            beitrag._titel = titel
            beitrag._inhalt = inhalt
            beitrag._erstellungszeit = datum
            beitrag._img = img
            beitrag._accountId = accountId
            result.append(beitrag)

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, beitrag):

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(idBeitrag) AS maxid FROM beitrag")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is None:
                beitrag._id = 1
            else:
                beitrag._id = maxid[0]+1

        command = "INSERT INTO beitrag (idBeitrag, titel, inhalt, datum, img, accountId) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (
            beitrag._id,
            beitrag._titel,
            beitrag._inhalt,
            beitrag._erstellungszeit,
            beitrag._img,
            beitrag._accountId
        )
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return beitrag

    def update(self):
        """Update an already given object in the DB"""
        pass

    def delete(self):
        """Delete an object from the DB"""
        pass
