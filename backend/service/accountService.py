from mapper import Mapper


class AccountService(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_id(self, id):
        result = None

        cursor = self._connection.cursor()
        command = "SELECT * FROM account WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, passwort, email) = tuples[0]
            account = Account()
            account.id = id
            account.name = name
            account.passwort = passwort
            account.email = email
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


    def insert(self):
        """Add the given object to the database"""
        pass

    def update(self):
        """Update an already given object in the DB"""
        pass

    def delete(self):
        """Delete an object from the DB"""
        pass
