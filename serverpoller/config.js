var config = {
    interval: 60, // polling interval in seconds. setting this too high might trigger ddos protections
    logging: {
        enabled: true,
        verbose: false // enabling this will make the script log every server it queries with ip:port
    },
    db: {
        host:       'localhost',
        rw_user:    'sql-rw-user',
        rw_pw:      'sql-rw-password',
        database:   'db'
    }
}

module.exports = config;