var config              = require('./config');

var hub                 = require('hub');
hub.mariasql            = require('mariasql');
hub.mariaSqlClientRO    = new hub.mariasql({
    // this is the read-only sql connection. you can also TCP instead of a unix socket here.
    // refer to https://github.com/mscdex/node-mariasql
    user:               config.db.ro_user,
    password:           config.db.ro_pw,
    db:                 config.db.database,
    unixSocket:         '/var/run/mysqld/mysqld.sock',
});
// currently not in use.
/*hub.mariaSqlClientRW    = new hub.mariasql({
    // this is the read-write sql connection. you can also TCP instead of a unix socket here.
    // refer to https://github.com/mscdex/node-mariasql
    user:               config.db.rw_user,
    password:           config.db.rw_pw,
    db:                 config.db.database,
    unixSocket:         '/var/run/mysqld/mysqld.sock',
});*/

var express     = require('express');
var list        = require('./modules/list');
var meta        = require('./modules/meta');
//var admin       = require('./modules/admin'); // for the admin interface, will be implemented later

var app         = express();
app.use('/api/list', list);
app.use('/api/meta', meta);
//app.use('/admin', admin); // for the admin interface, will be implemented later

// adjust host and port here if needed
app.listen(config.webserver.port, config.webserver.host, function() {
    if(config.logging.enabled) {
        console.log((new Date()).toISOString() + 'Express server listening at ' + this.address().address + ':' + this.address().port + ' in ' + app.settings.env + ' mode');
    }
});