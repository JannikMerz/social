
from service.accountService import AccountService


class Controller(object):
    def __init__(self):
        pass

    def create_account(self, name, email, google_user_id):
        account = Account()
        account.name = ...
        user.set_email(email)
        user.set_google_user_id(google_user_id)
        user.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(user)

    def get_account(self, id):
       with AccountService() as mapper:
            return mapper.find_by_id(id)