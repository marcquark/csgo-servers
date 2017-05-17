var hub     = require('hub');

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {

    // TODO: construct SQL query here

    if(req.query.type) {
        if(!Array.isArray(req.query.type)) {
            // only one type
        }
        else {
            let types = req.query.type.length;
            for(let i = 0; i < types; i++) {
                // multiple types
            }
        }
    }

    if(req.query.tag) {
        if(!Array.isArray(req.query.tag)) {
            // only one tag
        }
        else {
            let tags = req.query.tag.length;
            for(let i = 0; i < tags; i++) {
                // multiple types
            }
        }
    }

    // TODO: query database here
    res.sendStatus(200); // TODO: Return the result in JSON instead of a status code
});

module.exports = router;