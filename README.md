# csgo_serverlist
A simple web application that keeps track of a set of CS:GO servers and lets users display them filtered by category and tags. Work in progress. Tested on nodejs v6.10.3. 
## Installation instructions
#### General
You need an existing database. You can find the MySQL Workbench file in the Database folder. Creating the database and tables is currently up to you. As a security best practice i recommend you create two users, one that has write access to the tables (used for the serverpoller script) and one that has read-only access (for the backend server).
Once your database is up and running, download the scripts and put them in seperate folders.
#### Serverpoller
The script requires [node-gamequery](https://github.com/kurt-stolle/node-gamequery) and the mysql packages. This is taken care of in the dependencies. Simply put the folder where you want it to be and from the CLI run.
```shell
npm install
```
Then simply modify the MySQL credentials to fit your setup and run the script.
```shell
nodejs serverpoller.js
```
Note: I recommend you run this as an unprivileged user.