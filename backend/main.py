# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request
import json

# Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from server.ProjektAdministration import ProjektAdministration

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
class Projektverwaltungoperation(Resource):
    @electivApp.marshal_list_with(account)

    @secured
    def get(self, id):
        """Auslesen eines bestimmten Projekte-Objekts mit dem aktuellen Zustand
        """
        result = []
        adm = ProjektAdministration()
        projekte = adm.get_projekte()
        return result

@electivApp.route('/projekte/zustand/<string:zustand_id>/dozent/<int:dozent_id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektByZustandByDozentoperation(Resource):
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

@electivApp.route('/projekte/zustand')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Projektverwaltungzustandoperation(Resource):
    @electivApp.marshal_list_with(projekt)
    
    # @secured
    def put(self):       

        projektId = request.args.get("projektId")
        zustandId = request.args.get("zustandId")
        adm = ProjektAdministration()
        projekte = adm.get_projekte()
        

        for p in projekte:
            if p.get_id() == int(projektId):
                if zustandId == "Wahlfreigabe":
                    p.set_aktueller_zustand(Projekt.Z_WAHLFREIGABE)
                elif zustandId == "in Bewertung":
                    p.set_aktueller_zustand(Projekt.Z_IN_BEWERTUNG)
                elif zustandId == "Neu":
                    p.set_aktueller_zustand(Projekt.Z_NEU)
                elif zustandId == "Genehmigt":
                    p.set_aktueller_zustand(Projekt.Z_GENEHMIGT)
                elif zustandId == "Abgeschlossen":
                    p.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
                elif zustandId == "Abgelehnt":
                    p.set_aktueller_zustand(Projekt.Z_ABGELEHNT)

                adm.save_projekt(p)
                return p


@electivApp.route('/projekt/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektOperationen(Resource):
    @electivApp.marshal_list_with(projekt)
    
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Projekt-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        projekt = adm.get_projekt_by_id(id)
        return projekt

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Projekt-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        adm.delete_projekt(id)

@electivApp.route('/teilnahmen/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeListeOperationen(Resource):
    @electivApp.marshal_list_with(teilnahme)
    
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Teilnahmen-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """

        adm = ProjektAdministration()
        teilnahmen = adm.get_teilnahmen_von_student(id)
        return teilnahmen



if __name__ == '__main__':
    app.run(debug=True)