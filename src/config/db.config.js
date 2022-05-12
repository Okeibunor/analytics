module.exports = {
    host: process.env.MYSQL_HOST,
    port: process.env.PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    dialect: process.env.DB_CONNECTION,
    instance_connection_name: 'analytics-349805:us-central1:financial-analytics',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}