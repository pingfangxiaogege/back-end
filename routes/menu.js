var express = require('express');
var router = express.Router();

router.get('/list', (req, res, next) => {
    res.send('ad');
})

module.exports = router;