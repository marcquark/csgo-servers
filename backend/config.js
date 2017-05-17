var config = {
    logging: {
        enabled: true,
        verbose: false
    },
    webserver: {
        host:   'localhost',
        port:   8080
    },
    db: {
        ro_user:    'sql-ro-user',
        ro_pw:      'sql-ro-password',
        rw_user:    'sql-rw-user',
        rw_pw:      'sql-rw-password',
        database:   'database'
    }
};

module.exports = config;