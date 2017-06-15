# csgo_serverlist
A simple web application that keeps track of a set of CS:GO servers and lets users display them filtered by category and tags. Work in progress. Tested on nodejs v6.10.3 and MariaDB 10.0.29
## Installation instructions
#### General
You need an existing database. You can find the MySQL Workbench file in the Database folder. Creating the database and tables is currently up to you. As a security best practice i recommend you create two users, one that has write access to the tables (used for the serverpoller script) and one that has read-only access (for the backend server). Once your database is up and running, download the scripts and put them in seperate folders.
#### Forever
I highly recommend using forever to run the scripts as daemons. It automatically restarts your app when it crashes.
```shell
sudo npm install forever -g
```
#### Serverpoller
Put the folder where you want it to be, for example /home/pollinguser/serverpoller, and from the CLI run.
```shell
npm install
```
Then simply modify the MySQL credentials inside the config.js to fit your setup and run the script.
```shell
forever start -l /path/to/forever_serverpoller.log -a index.js
```
If you're not using forever:
```shell
node index.js
```
Note: I recommend you run this as an unprivileged user.
#### Backend
Put the folder where you want it to be, for example /home/backenduser/backend, and from the CLI run.
```shell
npm install
```
Then simply modify the MySQL credentials inside the config.js to fit your setup and run the script.
```shell
forever start -l /path/to/forever_backend.log -a server.js
```
If you're not using forever:
```shell
node server.js
```
Note: Run this as an unprivileged user, do not use root! The server currently only supports plain HTTP, which is why i highly recommend you run it on localhost. Use a web server like nginx to handle outside traffic and HTTPS connections. Here's an example how you can configure nginx to pass requests on to the node web server:
```
location /api/ {
    add_header Access-Control-Allow-Methods GET;
    add_header Access-Control-Allow-Headers Content-Type;

    proxy_pass http://localhost:8080;
}
```
If you want to allow other websites to use your API, you must also allow cross-origin requests:
```
    add_header Access-Control-Allow-Origin *;
```
#### Frontend
Put the files on your web server and modify functions.js to point to your own API.