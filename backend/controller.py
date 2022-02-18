
from service.accountService import AccountService
from service.beitragService import BeitragService


class Controller(object):
    def __init__(self):
        pass

    def get_account(self, id):
       with AccountService() as mapper:
            return mapper.find_by_id(id)

    def get_account_by_name(self, name):
       with AccountService() as mapper:
            return mapper.find_by_name(name)

    def post_account(self, account):
       with AccountService() as mapper:
            return mapper.insert(account)
    
    def get_beitraege(self):
       with BeitragService() as mapper:
            return mapper.find_all()

    def post_beitrag(self, beitrag):
        with BeitragService() as mapper:
            return mapper.insert(beitrag)
