from flask import render_template
import products_config

connex_app = products_config.connex_app

connex_app.add_api("products_swagger.yml")

@connex_app.route("/templates/")
def home():
	return render_template('products.html')

if __name__ == "__main__":
    connex_app.run(debug=True)
