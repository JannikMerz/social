from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource, fields
from flask import request
import json

from model.accountModel import Account
from model.beitragModel import Beitrag

from service.mapper import Mapper
from controller import Controller

app = Flask(__name__)

CORS(app, support_credentials=True, resources={r'/backend/*': {"origins": "*"}})


api = Api(app, version='1.0', title='API',
          description='')

petApp = api.namespace('backend', description='')

account = api.model('Account', {
    'id': fields.Integer(attribute='_id', description='ID'),
    'name': fields.String(attribute='_name', description='Name'),
    'passwort': fields.String(attribute='_passwort', description='PW'),
    'email': fields.String(attribute='_email', description='Mail'),
})

beitrag = api.model('Beitrag', {
    'id': fields.Integer(attribute='_id', description='ID des BOs'),
    'datum': fields.String(attribute='_erstellungszeit', description=''),
    'titel': fields.String(attribute='_titel', description=''),
    'inhalt': fields.String(attribute='_inhalt', description=''),
    'img': fields.String(attribute='_img', description=''),
    'accountId': fields.Integer(attribute='_accountId', description=''),
})


@petApp.route('/account/<int:id>')
@petApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AccountOps(Resource):
    @petApp.marshal_list_with(account)
    def get(self, id):
        controller = Controller()
        result = controller.get_account(id)
        return result

@petApp.route('/account-by-name/<string:name>')
@petApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AccountOps(Resource):
    @petApp.marshal_list_with(account)
    def get(self, name):
        controller = Controller()
        result = controller.get_account_by_name(name)
        return result

@petApp.route('/account')
@petApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AccountOps(Resource):
    @petApp.expect(account)
    def post(self):
        controller = Controller()
        account = Account.from_dict(api.payload)

        if account is not None:
            controller.post_account(account)
            return 200
        else: 
            return '', 500

@petApp.route('/beitraege')
@petApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class BeitraegeOps(Resource):
    @petApp.marshal_list_with(beitrag)
    def get(self):
        controller = Controller()
        result = controller.get_beitraege()
        return result

@petApp.route('/beitrag')
@petApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektartOperationen(Resource):
    @petApp.expect(beitrag)
    def post(self):
        controller = Controller()
        beitrag = Beitrag.from_dict(api.payload)

        if beitrag is not None:
            controller.post_beitrag(beitrag)
            return 200
        else: 
            return '', 500


if __name__ == '__main__':
    app.run(debug=True)