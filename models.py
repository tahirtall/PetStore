##from application import db
from adoptPets_config import adoptPetsDB, adoptPetsMA
from products_config import productsDB, productsMA
from userAccount_config import userAccountDB, userAccountMA

class User(userAccountDB.Model):
    __tablename__ = "user"
    userID = userAccountDB.Column(userAccountDB.Integer, primary_key=True)
    userName = userAccountDB.Column(userAccountDB.String(20),nullable=False)
    userFirst = userAccountDB.Column(userAccountDB.String(20), nullable=False)
    userLast = userAccountDB.Column(userAccountDB.String(50),unique=True, nullable=False)
    userPhone = userAccountDB.Column(userAccountDB.String(50),nullable=False)
    userEmail = userAccountDB.Column(userAccountDB.String(50), nullable=False)
    userAddress = userAccountDB.Column(userAccountDB.String(200), nullable=False)
    userAddress2 = userAccountDB.Column(userAccountDB.String(200), nullable=False)
    userState = userAccountDB.Column(userAccountDB.String(30), nullable=False)
    userZip = userAccountDB.Column(userAccountDB.String(6), nullable = False)

class UserSchema(userAccountMA.ModelSchema):
	class Meta:
		model = User
		sqla_session = userAccountDB.session

class Adopt(adoptPetsDB.Model):
    __tablename__ = "adopt"
    adoptID = adoptPetsDB.Column(adoptPetsDB.Integer, primary_key=True)
    adopName = adoptPetsDB.Column(adoptPetsDB.String(20),nullable=False)
    adoptType = adoptPetsDB.Column(adoptPetsDB.String(20),nullable=False)
    adoptBreed = adoptPetsDB.Column(adoptPetsDB.String(20),nullable=False)
    adoptDesc = adoptPetsDB.Column(adoptPetsDB.String(500), nullable=False)
    adoptAppearance = adoptPetsDB.Column(adoptPetsDB.String(100), nullable=False)
    adoptGender = adoptPetsDB.Column(adoptPetsDB.String(6), nullable=False)
    adoptSize = adoptPetsDB.Column(adoptPetsDB.String(10), nullable=False)

class AdoptSchema(adoptPetsMA.ModelSchema):
	class Meta:
		model = Adopt
		sqla_session = adoptPetsDB.session

class Product(productsDB.Model):
    __tablename__ = "products"
    productID = productsDB.Column(productsDB.Integer, primary_key=True)
    productName = productsDB.Column(productsDB.String(40),nullable=False)
    productDesc = productsDB.Column(productsDB.String(500),nullable=False)
    productCost = productsDB.Column(productsDB.String(10),nullable=False)
    productCurrentSale = productsDB.Column(productsDB.String(10),nullable=False)
    productStock = productsDB.Column(productsDB.Integer,nullable=False)

class ProductSchema(productsMA.ModelSchema):
	class Meta:
		model = Product
		sqla_session = productsDB.session
