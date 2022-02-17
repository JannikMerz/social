# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request
import json

# Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from service.mapper import Mapper

app = Flask(__name__)

CORS(app, support_credentials=True, resources={r'/backend/*': {"origins": "*"}})


api = Api(app, version='1.0', title='API',
          description='')

electivApp = api.namespace('backend', description='')

account = api.model('Account', {
    'id': fields.Integer(attribute='_id', description='ID'),
    'name': fields.string(attribute='_name', description='Name'),
    'mail': fields.string(attribute='_mail', description='Mail'),

})

beitrag = api.model('Beitrag', {
    'id': fields.Integer(attribute='_id', description='ID des BOs'),
})


@electivApp.route('/account')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AccountOps(Resource):
    @electivApp.marshal_list_with(account)

    @secured
    def get(self, id):
        """Auslesen eines bestimmten Projekte-Objekts mit dem aktuellen Zustand
        """
        result = []
        adm = ProjektAdministration()
        projekte = adm.get_projekte()
        return result

@electivApp.route('/beitrag/<string:zustand_id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class BeitragOps(Resource):
    @electivApp.marshal_list_with(projekt)
    @secured
    def get(self, zustand_id, dozent_id):
        """Auslesen eines Projekte-Objekts mit einem bestimmten Zustand und für einen bestimmten Dozent
        """
        result = []
        adm = ProjektAdministration()
        projekte = adm.get_projekte()
        for p in projekte:
            if str(p.get_aktueller_zustand()) == zustand_id and p.get_dozent() == dozent_id:
                result.append(p)
        return result



if __name__ == '__main__':
    app.run(debug=True)