var hub     = require('hub');

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {

    let queryString = 'SELECT `gameservers`.`id`,`gameservers`.`ip`,`gameservers`.`port`,`gameservers`.`map`,`gameservers`.`name`,`gameservers`.`players`,`gameservers`.`bots`,`gameservers`.`players_max` FROM `gameservers`,`servertags` WHERE `gameservers`.`is_up` = 1';

    if(req.query.type) {
        // handle arrays
        if(Array.isArray(req.query.type)) {
            // do not use more than one type. when multiple types are supplied, only the first one is used
            req.query.type = req.query.type[0];
        }

        req.query.type = Number.parseInt(req.query.type);

        // handle invalid input
        if(!Number.isFinite(req.query.type)) {
            // user tried to pass something that can not be parsed to a finite integer
            // TODO: log (verbose)
            res.sendStatus(400);
            return;
        }

        queryString += ' AND `gameservers`.`type` = ' + req.query.type;
    }

    if(req.query.tag) {
        if(!Array.isArray(req.query.tag)) {
            // if there is only one tag selected, create an array anyway so that we don't need to copy+paste the routine below
            req.query.tag = new Array(req.query.tag);
        }

        queryString += ' AND `gameservers`.`id` = `servertags`.`gameservers_id` AND `servertags`.`tags_id` IN (';

        // handle invalid input
        let tags = req.query.tag.length;
        for(let i = 0; i < tags; i++) {
            req.query.tag[i] = Number.parseInt(req.query.tag[i]);

            if(!Number.isFinite(req.query.tag[i])) {
                // user tried to pass something that can not be parsed to a finite integer
                // TODO: log (verbose)
                res.sendStatus(400);
                return;
            }
        }

        queryString += req.query.tag.toString() + ')';
    }

    queryString += " ORDER BY `players` DESC";

    hub.mariaSqlClientRO.query(queryString, function(err, rows) {
        if(err) {
            // TODO: log
            res.sendStatus(500);
            return;
        }

        res.send({servers: rows});
    });

    // TODO: log (verbose)
    //console.log(queryString);
});

module.exports = router;