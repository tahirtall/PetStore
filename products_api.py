from flask import make_response, abort
from products_config import productsDB

def read_all():
    product = Product.query.order_by(Product.productName).all()
    products_schema = ProductSchema(many=True)
    data = products_schema.dump(product).data
    return data

def read_one(productID):
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

def create(product):

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

def update(productID, product):

    # Get the person requested from the db into session
    update_product = Product.query.filter(
        Product.productID == productID
    ).one_or_none()

    # Try to find an existing person with the same name as the update
    productName = product.get("productName")

    existing_product = (
        Product.query.filter(Product.productName == productName)
        .one_or_none()
    )

    # Are we trying to find a person that does not exist?
    if update_product is None:
        abort(
            404,
            "Product not found for product ID: {productID}".format(productID=productID),
        )

    # Would our update create a duplicate of another person already existing?
    elif (
        existing_product is not None and existing_product.productID != productID
    ):
        abort(
            409,
            "Product {productName} exists already".format(
                productName=productName
            ),
        )

def delete(productID):
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
