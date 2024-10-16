import sys
import os

from flask import Flask

from source.controller.asset_management.admin_blueprint import admin_features
from source.common.get_config_data import ParseConfig
from source.common.database_manager import ManagePostgreSQLDB

#initializing flask
app = Flask(__name__)

#server can be run in local mode by passing -l command
if len(sys.argv)>1 and sys.argv[1] == "-l":
    port = 8081


# Initializing Database
ManagePostgreSQLDB().init_postgres(app=app, is_local=True)




env = os.environ.get('ENVIRONMENT','local')

parser_obj = ParseConfig('server_config.ini')
results = parser_obj.get_server_details()
host = results["host"]
port = int(results["port"])


app.register_blueprint(admin_features)



@app.route('/')
def home_page():
    return '<h3>BARODA_PHARMA_SERVER - V1</h3>'\
        '<p style="color:green"> VERSION : baroda-pharma-server-v1:0.1</p>'

if __name__ == '__main__':
    print("Version: baroda-pharma-server-v1: 0.1")
    app.run(host=host,port=port)