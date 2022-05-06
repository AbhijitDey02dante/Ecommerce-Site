const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productID',shopController.getIDProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/cart-delete-item',shopController.postCartDelete);

router.post('/order',shopController.postOrder);

router.get('/order',shopController.getOrders);

router.get((req,res)=>{
    res.sendFile(path.join(__dirname, `public/${req.url}`));
})

module.exports = router;
