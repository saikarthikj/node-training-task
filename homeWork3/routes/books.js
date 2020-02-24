const express = require('express');
const router = express.Router();
router.get('/books', (req,res) => {
    console.log("router working");
    res.send("router working");
});
module.exports = router;