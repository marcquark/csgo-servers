# csgo-servers
A simple web application that keeps track of a set of CS:GO servers and lets users display them filtered by category and tags. Work in progress. v2 is based on [loopback](https://loopback.io)
## Installation instructions
#### General
Clone the repository and run `npm install`
#### Forever
I highly recommend using forever to run the app. It automatically restarts when something crashes.
```shell
sudo npm install forever -g
```
#### App
Modify the following files:
* DB credentials in *server/datasources.json*
* Default admin and editor credentials in *server/boot/default-user.js*
Then simply run the app like so
```shell
forever start -l /path/to/csgo-servers.log -a server/server.js
```
Or if you're not using forever
```shell
node .
```
After you have first launched the app, you need to remove *server/boot/default-user.js* or it will crash during restart. This is because the default users and roles can only be created once in a persistent datastore. You should also definitely run the app in PRODUCTION environment if you're note developing. Otherwise the API Explorer and debugging will be enabled. They are a potential security risk and also decrease performance.