import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'jobportal_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

console.log('🔧 Database Configuration Loaded:', {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    hasPassword: !!dbConfig.password
});

const pool = mysql.createPool(dbConfig);

// Test connection on startup
pool.getConnection()
    .then(connection => {
        console.log('✅ Database connected successfully on startup');
        connection.release();
    })
    .catch(error => {
        console.error('❌ Database connection failed on startup:', error.message);
    });

export default pool;