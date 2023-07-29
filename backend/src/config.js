require('dotenv').config()

const config = {
    database: {
        connectionLimit: 10,
        host: process.env.host || "localhost",
        user: process.env.MYSQL_USERNAME || "root",
        password: process.env.MYSQL_ROOT_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "eclipse",
        port: process.env.MYSQL_LOCAL_PORT || "3306",
        dateString: true
    }
}

module.exports = config;