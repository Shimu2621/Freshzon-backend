const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

/**
 * @route /signin
 * @description  Performing signin of user
 * @access  Public
 */

router.post('/signin', async(req, res) => {
    try {
        // Extracting data by object destructuring
        const{ email, password } = req.body;

        // console.log(req.body);

        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        // Checks user exists or not
        const user = await User.findOne({ email: email});
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        //Matching the password
        const isMatched = await bcrypt.compareSync(password, user.password)
        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const payLoad = {
            user: {
                id: user.id
            }
        }


        //Generate JWT
        jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if(err) {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }

            res.status(200).json({ message: "Signin successfull", token })
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message : "Server Error "})
        }
})

module.exports = router;