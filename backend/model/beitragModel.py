
import datetime

class Beitrag:

    def __init__(self):
        self._id = 0
        self._erstellungszeit = datetime.datetime.now().replace(second=0, microsecond=0)
        self._titel = ''
        self._inhalt = ''
        self._img = ''
        self._accountId = ''


    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Beitrag()
        obj._id = dictionary['id']
        obj._titel = dictionary['titel']
        obj._inhalt = dictionary['inhalt']
        obj._img = dictionary['img']
        obj._accountId = dictionary['accountId']
        return obj
