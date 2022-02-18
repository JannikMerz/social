from service.mapper import Mapper
from model.accountModel import Account
import base64

class AccountService(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_id(self, id):
        result = None

        cursor = self._connection.cursor()
        command = "SELECT * FROM account WHERE idAccount={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, passwort, email) = tuples[0]
            account = Account()
            account._id = id
            account._name = name
            account._passwort = passwort
            account._email = email
            result = account

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_name(self, name):
        result = None

        cursor = self._connection.cursor()
        command = "SELECT * FROM account WHERE name='{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, passwort, email) = tuples[0]
            account = Account()
            account._id = id
            account._name = name
            account._passwort = passwort
            account._email = email
            result = account

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_all(self):
        """Auslesen aller Bewertungen aus der Datenbank
        :return Alle Bewertung-Objekte im System
        """
        result = []

        cursor = self._connection.cursor()
        
        cursor.execute("SELECT * from bewertungen")
        tuples = cursor.fetchall()

        for (id,note) in tuples:
            bewertung = Bewertung()
            bewertung.set_id(id)
            bewertung.set_note(note)
            result.append(bewertung)
        
    

        self._connection.commit()
        cursor.close()
        return result


    def insert(self, account):

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(idAccount) AS maxid FROM account")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is None:
                account._id = 1
            else:
                account._id = maxid[0]+1

        command = "INSERT INTO account (idAccount, name, passwort, email) VALUES (%s,%s,%s,%s)"
        data = (
            account._id,
            account._name,
            account._passwort,
            account._email,
        )
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return account

    def update(self):
        """Update an already given object in the DB"""
        pass

    def delete(self):
        """Delete an object from the DB"""
        pass
