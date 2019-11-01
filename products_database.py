import os
from products_config import productsDB
from products_models import Product

# Initializing the database for products.
PRODUCTS = [
        {"productID": 301, "productName": "Whole Hearted", "productDesc": "Grain Free All Life Stages Salmon and Pea Recipe Dry Dog", "productScale": '25lb', "productCost": "44.99", "productCurrentSale": "42.74", "productStock": "12"},
        {"productID": 302, "productName": "Just Food for Dogs", "productDesc": "Pantry Fresh Beef and Russet Potato Dog Food", "productScale": "12X12.5 OZ", "productCost": "54.95", "productCurrentSale": "49.99", "productStock": "9"},
        {"productID": 303, "productName": "Royal Canin", "productDesc": "Feline Health Nutrition Dry Food for Young Kittens", "productScale": "15lb", "productCost": "51.29", "productCurrentSale": "48.73", "productStock": "21"},
]

if os.path.exists('products.db'):
	os.remove('products.db')

productsDB.create_all()

for product in PRODUCTS:
        p = Product(productID=product.get('productID'), productName=product.get('productName'), productDesc=product.get('productDesc'), productScale=product.get('productScale'), productCost=product.get('productCost'), productCurrentSale=product.get('productCurrentSale'), productStock=product.get('productStock'))
        productsDB.session.add(p)

productsDB.session.commit()
