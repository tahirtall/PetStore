from flask import render_template
import adoptPets_config

connex_app = config.connex_app

connex_app.add_api("adoptPets_swagger.yml")

@connex_app.route("/templates/")
def home():
	return render_template('adoptPets.html')

if __name__ == "__main__":
    connex_app.run(debug=True)
