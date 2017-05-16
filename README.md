# csgo_serverlist
A simple web application that keeps track of a set of CS:GO servers and lets users display them filtered by category and tags. Work in progress.
## Installation instructions
The script requires [node-gamequery](https://github.com/kurt-stolle/node-gamequery). It can be installed from the command line.
```shell
npm install gamequery
```
You also need an existing database. You can find the MySQL Workbench file in the Database folder. Creating the database and tables is currently up to you. As a security best practice i recommend you create two users, one that has write access to the tables (used for the serverpoller script) and one that has read-only access (for the frontend).
Once your database is up and running, download the script, modify the credentials at the top and simply run it like so
```shell
nodejs serverpoller.js
```
Note: I also recommend you run this as an unprivileged user.