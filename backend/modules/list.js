var hub     = require('hub');

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {

    let queryString = 'SELECT `gameservers`.`id`,`gameservers`.`ip`,`gameservers`.`port`,`gameservers`.`map`,`gameservers`.`name`,`gameservers`.`players`,`gameservers`.`bots`,`gameservers`.`players_max`,GROUP_CONCAT(`servertags`.`tags_id`) AS `tags` FROM `gameservers` LEFT JOIN `servertags` ON `gameservers`.`id` = `servertags`.`gameservers_id` WHERE `gameservers`.`is_up` = 1';

    if(req.query.category) {
        req.query.category = Number.parseInt(req.query.category);

        // handle invalid input
        if(!Number.isFinite(req.query.category)) {
            // user tried to pass something that can not be parsed to a finite integer
            // TODO: log (verbose)
            res.sendStatus(400);
            return;
        }

        if(req.query.category > 0) {
            queryString += ' AND `gameservers`.`category` = ' + req.query.category;
        }
    }

    if(req.query.tag) {
        if(!Array.isArray(req.query.tag)) {
            // if there is only one tag selected, create an array anyway so that we don't need to copy+paste the routine below
            req.query.tag = new Array(req.query.tag);
        }

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

        queryString += ' AND `gameservers`.`id` IN (SELECT DISTINCT `gameservers_id` FROM `servertags` WHERE `tags_id` IN (' + req.query.tag.toString() + '))';
    }

    if(req.query.notag) {
        if(!Array.isArray(req.query.notag)) {
            // if there is only one tag selected, create an array anyway so that we don't need to copy+paste the routine below
            req.query.notag = new Array(req.query.notag);
        }

        // handle invalid input
        let tags = req.query.notag.length;
        for(let i = 0; i < tags; i++) {
            req.query.notag[i] = Number.parseInt(req.query.notag[i]);

            if(!Number.isFinite(req.query.notag[i])) {
                // user tried to pass something that can not be parsed to a finite integer
                // TODO: log (verbose)
                res.sendStatus(400);
                return;
            }
        }

        queryString += ' AND `gameservers`.`id` NOT IN (SELECT DISTINCT `gameservers_id` FROM `servertags` WHERE `tags_id` IN (' + req.query.notag.toString() + '))';
    }

    if(req.query.notfull) {
        req.query.notfull = Number.parseInt(req.query.notfull);

        // handle invalid input
        if(!Number.isFinite(req.query.notfull)) {
            // user tried to pass something that can not be parsed to a finite integer
            // TODO: log (verbose)
            res.sendStatus(400);
            return;
        }

        if(req.query.notfull == 1) {
            queryString += ' AND `gameservers`.`players` < `gameservers`.`players_max`';
        }
    }

    if(req.query.notempty) {
        req.query.notempty = Number.parseInt(req.query.notempty);

        // handle invalid input
        if(!Number.isFinite(req.query.notempty)) {
            // user tried to pass something that can not be parsed to a finite integer
            // TODO: log (verbose)
            res.sendStatus(400);
            return;
        }

        if(req.query.notempty == 1) {
            queryString += ' AND `gameservers`.`players` > 0';
        }
    }

    queryString += ' GROUP BY `gameservers`.`id` ORDER BY `gameservers`.`players` DESC';

    hub.mariaSqlClientRO.query(queryString, function(err, rows) {
        if(err) {
            // TODO: log
            res.sendStatus(500);
            return;
        }

        res.json({servers: rows});
    });

    // TODO: log (verbose)
    //console.log(queryString);
});

module.exports = router;