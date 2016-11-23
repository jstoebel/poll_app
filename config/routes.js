var express = require('express')
var router = express.Router();

router.get('/eggs', function(req, res) {
    res.send('hello from spam!');
});

module.exports = router;
