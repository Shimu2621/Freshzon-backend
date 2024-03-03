const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const auth = require("../middlewares/auth");

/**
 * @route /create
 * @description creating the product
 * @access Private
 */

router.post("/create", auth, async(req, res) => {
    try {
        const { name, prevPrice, currentPrice, type, image, description } = req.body;

        //creating an instance
        const product = new Product({
            name,
            prevPrice,
            currentPrice,
            type,
            image,
            description
        })

        await product.save();
        res.status(201).json({
            product
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error"
        })
    }
})

/**
 * @route /getProducts
 * @description getting all the products
 * @access public
 */

router.get('/getProducts', auth, async(req, res) => {
    try {
        const products = await product.find();

        if(products.length > 0) {
            return res.status(200).json({
                products
            })
        }

        return res.status(200).json({
            message: "There are no products"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

/**
 * @route /edit/:productid
 * @description edit the product property
 * @access private(use auth)
 */

router.patch("/edit/:productid", auth, async(req, res) => {
    const productId = req.params.productid;
    
    const { name, prevPrice, currentPrice, stars, discounts, type, image, description } = req.body;

    try {
      const product = await Product.findById(productId);
      if(!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
      }
      
      if(prevPrice) {
        product.prevPrice = prevPrice;
      }

      if(currentPrice) {
        product.currentPrice = currentPrice;
      }

      if(discounts) {
        product.discounts = discounts;
      }

      if(stars) {
        product.stars = stars;
      }

      if(type) {
        product.type = type;
      }

      if(image) {
        product.image = image;
      }

      if(description) {
        product.description = description;
      }

      await product.save();

      res.status(200).json({
        message: 'Product updated successfully'
      })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

/**
 * @route /delete/:productid
 * @description Deleting the property of product by id
 * @access private
 */

router.delete("/delete/:productid", auth, async(req, res) => {
    const productId = req.params.productid;

    try {
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        await product.deleteOne();

        res.status(200).json({
            message: "Product deleting successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error"
        })
    }
})

module.exports = router;