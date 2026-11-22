import mysql from "mysql2/promise";

// MySQL connection pool + first-use table creation.
// Replaces the old MongoDB/Mongoose layer (lib/mongodb.js). Configuration
// comes from environment variables only — never hard-code credentials:
//   DB_HOST (default 127.0.0.1), DB_PORT (default 3306),
//   DB_USER, DB_PASSWORD, DB_NAME
const cache = (globalThis.__mysqlCache ??= { pool: null, schemaPromise: null });

export function getPool() {
  if (!cache.pool) {
    cache.pool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return cache.pool;
}

// Runs a parameterised query and returns the rows (or the INSERT result).
export async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}

const CREATE_USERS = `
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`;

const CREATE_CONTACT_MESSAGES = `
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  user_id INT UNSIGNED NULL,
  status ENUM('new', 'read', 'replied') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_cm_user (user_id),
  KEY idx_cm_status (status),
  CONSTRAINT fk_cm_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`;

// Creates the tables on first use, mirroring how Mongoose created its
// collections automatically. Runs once per process; also available as a
// file in sql/schema.sql for manual import (phpMyAdmin).
export async function ensureSchema() {
  if (!cache.schemaPromise) {
    cache.schemaPromise = (async () => {
      const pool = getPool();
      await pool.query(CREATE_USERS);
      await pool.query(CREATE_CONTACT_MESSAGES);
    })().catch((err) => {
      cache.schemaPromise = null; // allow a retry on the next request
      throw err;
    });
  }
  return cache.schemaPromise;
}

// Same name the routes used with MongoDB, so call sites barely change:
// await connectDB() before touching the database.
export async function connectDB() {
  await ensureSchema();
}
