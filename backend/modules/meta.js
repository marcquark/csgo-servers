var hub     = require('hub');

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    hub.mariaSqlClientRO.query('SELECT `id`,`name` FROM `tags`', function(err, rows) {
        if(err) {
            res.sendStatus(500);
            // TODO: Proper error handling
            return;
        }
        // TODO: concatenate the results to a nice JSON reply
        hub.mariaSqlClientRO.query('SELECT `id`,`name` FROM `types`', function(err, rows) {
            if(err) {
                res.sendStatus(500);
                // TODO: Proper error handling
                return;
            }
            // TODO: concatenate the results to a nice JSON reply
            res.sendStatus(200); // TODO: send out the reply here instead of a status code
        });
    });
});

module.exports = router;