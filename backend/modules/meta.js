var hub     = require('hub');

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    var meta = {};
    hub.mariaSqlClientRO.query('SELECT `id`,`name` FROM `tags`', function(err, rows) {
        if(err) {
            // TODO: log
            res.sendStatus(500);
            return;
        }

        meta.tags = rows;

        hub.mariaSqlClientRO.query('SELECT `id`,`name` FROM `types`', function(err, rows) {
            if(err) {
                // TODO: log
                res.sendStatus(500);
                return;
            }

            meta.types = rows;

            res.send(meta);
        });
    });
});

module.exports = router;