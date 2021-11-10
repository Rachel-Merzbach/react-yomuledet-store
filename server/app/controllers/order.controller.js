const db = require("../models");
const Order = db.Order;


//create new order
exports.create = (req, res) => {
    //validate properties are not empty
    if (!req.body.userId) {
        return res.status(400).send({
            message: "order content must be full"
        });
    }

    //create the oreder Schema
    const order = new Order({
        userId: req.body.userId,
        date: new Date(),
        productId: req.body.productId,
    });


    //save the Schema into db
    order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while creating the order."
            });
        });
};


//return the whole orders in db
exports.findAll = (req, res) => {
    Order.find({userId: req.query.userId})
        .then(orders => {
            res.send(orders);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while retrieving order."
            });
        });
};


//return order details by id
exports.findOne = (req, res) => {
    Order.findOne({userId: req.query.userId, productId: req.query.productId})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "order not found"
                });
            }
            res.send(note);

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "order not found"
                });
            }
            return res.status(500).send({
                message: "error retrieving order"
            });
        });
};



//update order by id
exports.update = (req, res) => {
    Order.findOneAndUpdate(req.params, {
        date: new Date(),
        totalPrice: req.body.totalPrice,
        orderDetails: req.body.orderDetails
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "order not found"
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "order not found"
                });
            }
            return res.status(500).send({
                message: "error updating order"
            });
        });
};



//delete order by id
exports.delete = (req, res) => {
    // console.log(req.body._id);
    Order.findByIdAndRemove(req.query._id)
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