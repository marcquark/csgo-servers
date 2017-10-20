'use strict';

module.exports = function(app) {

  app.models.User.create([
    {username: 'admin', email: 'admin@csgo-servers.eu', password: 'admin'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

    // create the admin role
    app.models.Role.create({name: 'admin'}, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      // make admin an admin
      role.principals.create({
        principalType: app.models.RoleMapping.USER,
        principalId: users[0].id,
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });
  
  app.models.User.create([
    {username: 'editor', email: 'editor@csgo-servers.eu', password: 'editor'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

    // create the editor role
    app.models.Role.create({name: 'editor'}, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      // make editor an editor
      role.principals.create({
        principalType: app.models.RoleMapping.USER,
        principalId: users[0].id,
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });
};
