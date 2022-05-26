const express = require('express');
const productRouter = express.Router();
const { requireUser } = require('./utils');
const { getProductById, getAllProducts,  } = require('../db');
productRouter.use((req, res, next) => {
    console.log('A request is being made to /activities');
    next();
});
productRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products);
    } catch (error) {
        next(error)
    }
});

productRouter.patch('/:prodcutId', requireUser, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { name, description } = req.body;
        const originalProduct = await getProductById(productId);
        if (!originalProduct) {
            next({
                name: 'noActivityError',
                message: 'There is no original Activity'
            })
        }
        if (parseInt(originalProduct.id) === parseInt(productId)) {
            const updatedProduct = await updatedProduct({ id: productId, name, description });
            res.send(updatedProduct)
        } else {
            next({
                name: 'InvalidUpdate',
                message: 'Update could not be completed'
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = activitiesRouter;