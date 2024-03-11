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
        const { name, prevPrice, currentPrice, category, quantity, description } = req.body;

        if(!name || !prevPrice || !currentPrice || !category || !quantity|| !description){
            return res.status(400).json({
                message: 'Please provide all fields'
            })
        }

        //creating an instance
        const product = new Product({
            name,
            prevPrice,
            currentPrice,
            category,
            quantity,
            description
        })

        //using mongoose method to save product object
        await product.save();
        res.status(201).json({
            message: 'Product created successfully', product
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

router.get('/getProducts', async(req, res) => {
    try {
        const products = await products.find();

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
    
    const { name, prevPrice, currentPrice, category, quantity, description } = req.body;

    try {
      const product = await Product.findById(productId);
      if(!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
      }

      if(name) {
        product.name = name;
      }
      
      if(prevPrice) {
        product.prevPrice = prevPrice;
      }

      if(currentPrice) {
        product.currentPrice = currentPrice;
      }

      if(quantity) {
        product.quantity = quantity;
      }

      if(category) {
        product.category = category;
      }

    //   if(image) {
    //     product.image = image;
    //   }

      if(description) {
        product.description = description;
      }

      await product.save();

      res.status(200).json({
        message: 'Product edited successfully'
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