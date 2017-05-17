var config = require('./config');

var gamequery = require('gamequery');
/* mysql connection setup and default error handling */
var mysql = require('mysql').createConnection({
  host     : config.db.host,
  user     : config.db.rw_user,
  password : config.db.rw_pw,
  database : config.db.database,
});
mysql.on('error', function(err) {
  console.error((new Date()).toISOString() + ' sql connection error:' + err.stack);
  process.exit(1);
});

/* this function queries a single server using game-server-query */
function query_server(element, index, array) { // necessary prototype for forEach, we will only need the element object
  if(config.logging.verbose) {
    console.log((new Date()).toISOString() + ' Querying ' + element.ip + ':' + element.port + ' (id ' + element.id + ')');
  }

  gamequery.query({
    type: 'csgo',
    host: element.ip,
    port: element.port,
    notes: element.id
  },
  function(error, state) {
    if(error) {
      if(config.logging.verbose) {
        console.error(error);
      }
    }
    else {
      update_server_state(state.notes, true, state.name.trim(), state.map, state.players.length, state.bots.length, state.maxplayers);
    }
  });
}

/* this function updates a server's state in the database */
function update_server_state(id, name, map, players, bots, players_max) {
  fields = {is_up: '1', name: name, map: map, players: players, bots: bots, players_max: players_max};

  mysql.query('UPDATE `gameservers` SET ? WHERE `id` = ?', [fields,id], function (err, rows, fields) {
    if(err) console.error((new Date()).toISOString() + ' ' + err);
  });
}

/* this function grabs a server list from the database and queries every single server. the query callback will then update the server's state*/
function main_loop() {
  if(config.logging.enabled) {
    console.log((new Date()).toISOString() + ' fetching server list from database');
  }
  mysql.query('UPDATE `gameservers` SET ?', [{is_up: '0'}], function(err, rows, fields) {
    mysql.query('SELECT `id`,`ip`,`port` FROM `gameservers`', function(err, rows, fields) {
    if(err) {
      console.error((new Date()).toISOString() + ' could not fetch the serverlist from the database: ' + err.stack);
	  }
    else {
      console.log((new Date()).toISOString() + ' querying ' + rows.length + ' servers');
      rows.forEach(query_server);
    }
    });
  });
}

if(config.logging.enabled) {
  console.log((new Date()).toISOString() + ' launched ');
  console.log((new Date()).toISOString() + ' connecting to mysql server');
}
mysql.connect();
main_loop();
var mainInterval = setInterval(main_loop, config.interval*1000);
