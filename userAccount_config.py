import os
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

basedir = os.path.abspath(os.path.dirname(__file__))
connex_app = connexion.App(__name__, specification_dir=basedir)
app = connex_app.app

# variables for database to connect to the sqlite
sqlite_url = "sqlite:////" + os.path.join(basedir, "userAccounts.db")
app.config['SQLALCHEMY_ECHO'] = True
app.config["SQLALCHEMY_DATABASE_URI"] = sqlite_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


userAccountDB = SQLAlchemy(app)
userAccountMA = Marshmallow(app)
