
class Account:

    def __init__(self):
        self._id = 0
        self._name = ''
        self._passwort = ''
        self._email = ''


    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Account()
        obj._id = dictionary['id']
        obj._name = dictionary['name']
        obj._passwort = dictionary['passwort']
        obj._email = dictionary['email']
        return obj
