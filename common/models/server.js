'use strict';

module.exports = function(Server) {
  // loopback currently doesn't implement validations
  // http://loopback.io/doc/en/lb3/Model-definition-JSON-file.html#properties
  // so it has to be done in code.

  Server.validatesPresenceOf('ipport', 'category');

  Server.validatesUniquenessOf('ipport', {
    message: 'IP:Port combination already exists',
  });

  Server.validatesNumericalityOf('players', {
    int: true,
    message: {
      int: 'is not an integer',
    },
  });
  Server.validatesNumericalityOf('bots', {
    int: true,
    message: {
      int: 'is not an integer',
    },
  });
  Server.validatesNumericalityOf('players_max', {
    int: true,
    message: {
      int: 'is not an integer',
    },
  });
};
