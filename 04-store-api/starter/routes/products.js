const express = require('express')
const router = express.Router()

const {
    getAllProductsStatic,
    getAllProducts,
    getProduct
} = require('../controllers/products')

router.get('/static', getAllProductsStatic)
router.get('/', getAllProducts)
router.get('/:id', getProduct)

module.exports = router