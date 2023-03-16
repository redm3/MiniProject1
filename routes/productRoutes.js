const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController')


router.get('/', (req, res) => {
    productController.getProducts(req, res)
});



module.exports = router;