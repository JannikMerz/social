




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