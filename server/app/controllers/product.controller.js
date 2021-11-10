const db = require("../models");
const Product = db.Product;


//create new product
exports.create = (req, res) => {
    //validate properties are not empty
    if (!req.body.name) {
        return res.status(400).send({
            message: "product can not be empty"
        });
    }

    //create the product Schema
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        picture:req.body.picture,
        sale: "0"
    });

    //save the Schema into db
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while creating the price."
            });
        });
};

//return the whole products in db
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while retrieving product."
            });
        });
};

//return the whole products in db
exports.findByIds = (req, res) => {
    console.log(req.body.ids)
    Product.find({_id: req.body.ids})
        .then(products => {
            console.log(products)
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while retrieving product."
            });
        });
};

//return product details by id
exports.findOne = (req, res) => {
    // console.log(req.query)
    Product.findById(req.query._id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "product not found"
                });
            }
            // console.log(note)
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found"
                });
            }
            return res.status(500).send({
                message: "error retrieving product"
            });
        });
};



//update product by id
exports.update = (req, res) => {
    // console.log(req.query)
    Product.findByIdAndUpdate(req.query.id, {
        sale: req.body.sale,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "product not found"
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found"
                });
            }
            return res.status(500).send({
                message: "error updating product"
            });
        });
};

//delete order by id
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "product not found"
                });
            }
            res.send({ message: "product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "product not found"
                });
            }
            return res.status(500).send({
                message: "could not delete product"
            });
        });
};
