from products_config import productsDB, productsMA

class Product(productsDB.Model):
    __tablename__ = "product"
    productID = productsDB.Column(productsDB.Integer, primary_key=True)
    productName = productsDB.Column(productsDB.String(40))
    productDesc = productsDB.Column(productsDB.String(500))
    productScale = productsDB.Column(productsDB.String(10))
    productCost = productsDB.Column(productsDB.String(10))
    productCurrentSale = productsDB.Column(productsDB.String(10))
    productStock = productsDB.Column(productsDB.String(32))

class ProductSchema(productsMA.ModelSchema):
    class Meta:
        model = Product
        sqla_session = productsDB.session
