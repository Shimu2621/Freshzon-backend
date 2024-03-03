const express = require("express");

//Call router method
const router = express.Router();

//api routes(routes folder)
router.use('/api/user', require("../routes/user"))
router.use('/api/auth', require("../routes/auth"))
router.use('/api/product', require("../routes/product"))


// create router with end point "health" to check it's healthy, like Db connection is live,if not reject it
router.get('/health', (req, res) => {
    return res.status(200).json({
        message: "Success"
    })
})

module.exports = router;