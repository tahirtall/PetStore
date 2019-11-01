#This is the Pet Adoption module. It supports all the REST actions for the
#data.

from flask import make_response, abort
from adoptPets_config import adoptPetsDB
from products_config import productsDB
from userAccount_config import userAccountDB
from models import Adopt, User, Product, AdoptSchema, UserSchema, ProductSchema

# Fetches the whole database

def read_all_adopts():
	adopt = Adopt.query.order_by(Adopt.adoptName).all()
	adopt_schema = AdoptSchema(many=True)
	data = adopt_schema.dump(adopt).data
	return data

def read_all_users():
	user = User.query.order_by(User.userFirst).all()
	user_schema = UserSchema(many=True)
	data = user_schema.dump(user).data
	return data

def read_all_products():
	product = Product.query.order_by(Product.productName).all()
	products_schema = ProductSchema(many=True)
	data = products_schema.dump(product).data
	return data

# --------------------------------------------------------------------------------------

# Fetches one object from the database.

def read_one_adopt(adoptID):

    adopt = Adopt.query.filter(Adopt.adoptID == adoptID).one_or_none()

    if adopt is not None:

        adopt_schema = AdoptSchema()
        data = adopt_schema.dump(adopt).data
        return data
    else:
        abort(
            404,
            "Pet not found for id: {adoptID}".format(adoptID=adoptID),
        )

def read_one_user(userID):

    user = User.query.filter(User.userID == userID).one_or_none()

    if user is not None:

        user_schema = UserSchema()
        data = user_schema.dump(user).data
        return data
    else:
        abort(
            404,
            "User not found for ID: {userID}".format(userID=userID),
        )

def read_one_products(productID):

    product = Product.query.filter(Product.productID == productID).one_or_none()

    if product is not None:

        product_schema = ProductSchema()
        data = product_schema.dump(product).data
        return data
    else:
        abort(
            404,
            "Product not found for ID: {productID}".format(productID=productID),
        )

# --------------------------------------------------------------------------------------

# Creates a new object for the database.

def create_adopt(adopt):

    adoptName = ADOPT.get("adoptName")
    adoptType = ADOPT.get("adoptType")
    adoptBreed = ADOPT.get("adoptBreed")
    adoptDesc = ADOPT.get("adoptDesc")
    adoptAppearance = ADOPT.get("adoptAppearance")
    adoptGender = ADOPT.get("adoptGender")
    adoptSize = ADOPT.get("adoptSize")

    existing_pet = (
        Adopt.query.filter(Adopt.adoptName == adoptName)
        .filter(Adopt.adoptType == adoptType)
        .filter(Adopt.adoptBreed == adoptBreed)
        .filter(Adopt.adoptDesc == adoptDesc)
        .filter(Adopt.adoptAppearance == adoptAppearance)
        .filter(Adopt.adoptGender == adoptGender)
        .filter(Adopt.adoptSize == adoptSize)
        .one_or_none()
    )

    if existing_pet is None:

        schema = AdoptSchema()
        new_pet = schema.load(adopt, session=db.session).data

        db.session.add(new_pet)
        db.session.commit()

        data = schema.dump(new_pet).data

        return data, 201

    else:
        abort(
            409,
            "{adoptName} already exists".format(
                adoptName=adoptName
            ),
        )

def create_user(user):

    userName = USER.get("userName")
    userFirst = USER.get("userFirst")
    userLast = USER.get("userLast")
    userPhone = USER.get("userPhone")
    userEmail = USER.get("userEmail")
    userAddress = USER.get("userAddress")
    userAddress2 = USER.get("userAddress2")
    userState = USER.get("userState")
    userZip = USER.get("userZip")


    existing_user = (
        User.query.filter(User.userName == userName)
        .filter(User.userFirst == userFirst)
        .filter(User.userLast == userLast)
        .filter(User.userPhone == userPhone)
        .filter(User.userEmail == userEmail)
        .filter(User.userAddress == userAddress)
        .filter(User.userAddress2 == userAddress2)
        .filter(User.userState == userState)
        .filter(User.userZip == userZip)
        .one_or_none()
    )

    if existing_user is None:

        schema = UserSchema()
        new_user = schema.load(user, session=db.session).data

        db.session.add(new_user)
        db.session.commit()

        data = schema.dump(new_user).data

        return data, 201

    else:
        abort(
            409,
            "{UserName} already exists".format(
                UserName=userName
            ),
        )

def create_product(product):

    productName = PRODUCTS.get("productName")
    productDesc = PRODUCTS.get("productDesc")
    productCost = PRODUCTS.get("productCost")
    productCurrentSale = PRODUCTS.get("productCurrentSale")
    productStock = PRODUCTS.get("productStock")

    existing_product = (
        Products.query.filter(Products.productName == productName)
        .filter(Products.productDesc == productDesc)
        .filter(Products.productCost == productCost)
        .filter(Products.productCurrentSale == productCurrentSale)
        .filter(Products.productStock == productStock)
        .one_or_none()
    )

    if existing_product is None:

        schema = ProductSchema()
        new_product = schema.load(product, session=db.session).data

        db.session.add(new_product)

        data = schema.dump(new_product).data

        return data, 201

    else:
        abort(
            409,
            "{productName} already exists".format(
                productName=productName
            ),
        )

# --------------------------------------------------------------------------------------

# Updates an object from the database.

def update_adopt(adoptID, adoptName):

    update_pet = Adopt.query.filter(
        Adopt.adoptID == adoptID
    ).one_or_none()

    if update_pet is not None:

        schema = AdoptSchema()
        update = schema.load(adoptName, session=db.session).data

        update.adoptID = update_pet.adoptID

        db.session.merge(update)
        db.session.commit()

        data = schema.dump(update_pet).data

        return data, 200

    else:
        abort(
            404,
            "Pet not found for ID: {adoptID}".format(adoptID=adoptID),
        )

def update_user(userID, userName):

    update_users = User.query.filter(
        User.userID == userID
    ).one_or_none()

    if update_users is not None:

        schema = UserSchema()
        update = schema.load(userName, session=db.session).data

        update.userID = update_users.userID

        db.session.merge(update)
        db.session.commit()

        data = schema.dump(update_users).data

        return data, 200

    else:
        abort(
            404,
            "User not found for ID: {userID}".format(userID=userID),
        )

def update_product(productID, productName):

	update_products = Product.query.filter(
		Product.productID == productID
	).one_or_none()

	if update_products is not None:
		schema = ProductSchema()
		update = schema.load(productName, session=db.session).data

		update.productID = update_products.productID

		db.session.merge(update)
		db.session.commit()

		data = schema.dump(update_products).data

		return data, 200

	else:
		abort(
			404,
			"Product not found for ID: {productID}".format(productID=productID),
		)

# ------------------------------------------------------------------------------------

# Deletes an object from the database.

def delete_adopt(adoptID):
    adopt = Adopt.query.filter(Adopt.adoptID == adoptID).one_or_none()

    if adopt is not None:
        db.session.delete(adopt)
        db.session.commit()
        return make_response(
            "Pet {adoptID} is deleted".format(adoptID=adoptID), 200
        )
    else:
        abort(
            404,
            "Pet not found for ID: {adoptID}".format(adoptID=adoptID),
)

def delete_user(userID):
    user = User.query.filter(User.userID == userID).one_or_none()

    if user is not None:
        db.session.delete(user)
        db.session.commit()
        return make_response(
            "User {userID} is deleted".format(userID=userID), 200
        )
    else:
        abort(
            404,
            "User not found for ID: {userID}".format(userID=userID),
)

def delete_product(productID):
    product = Product.query.filter(Product.productID == productID).one_or_none()

    if product is not None:
        db.session.delete(product)
        db.session.commit()
        return make_response(
            "Product {productID} is deleted".format(productID=productID), 200
        )
    else:
        abort(
            404,
            "Product not found for ID: {productID}".format(productID=productID),
)
