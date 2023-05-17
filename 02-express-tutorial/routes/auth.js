const express = require('express')
const router = express.Router();

router.post('/', (req,res) => {
    const { name } = req.body
    if (!name) {
        // return res.status(401).json({success: false, msg: 'Please provide credentials'})
        return res.send('Please provide credentials')
    }
    // res.json({success: true, msg: `Welcome ${name}`})
    res.send(`Welcome ${name}`)
});

module.exports = router
