import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    connectionLimit: 200,
    maxIdle: 10,
    waitForConnections: true
})

export default pool