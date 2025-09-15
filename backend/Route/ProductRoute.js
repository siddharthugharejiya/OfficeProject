
const express = require('express')
const { AddProduct, getProduct } = require('../Controller/ProductController')

const ProductRoutes = express.Router()

ProductRoutes.post("/add",AddProduct)
ProductRoutes.get("/get",getProduct)

module.exports = ProductRoutes