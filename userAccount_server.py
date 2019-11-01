from flask import render_template
import userAccount_config

connex_app = config.connex_app

connex_app.add_api("userAccount_swagger.yml")

@connex_app.route("/templates/")
def home():
	return render_template('userAccount.html')

if __name__ == "__main__":
    connex_app.run(debug=True)
