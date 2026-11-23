import mysql from "mysql2/promise";

// MySQL connection pool + first-use table creation.
// Replaces the old MongoDB/Mongoose layer (lib/mongodb.js). Configuration
// comes from environment variables only — never hard-code credentials:
//   DB_HOST (default 127.0.0.1), DB_PORT (default 3306),
//   DB_USER, DB_PASSWORD, DB_NAME
const cache = (globalThis.__mysqlCache ??= { pool: null, schemaPromise: null });
const SCHEMA_VERSION = "inquiries-table";
if (cache.schemaVersion !== SCHEMA_VERSION) {
  cache.schemaVersion = SCHEMA_VERSION;
  cache.schemaPromise = null;
}

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

const CREATE_INQUIRIES = `
CREATE TABLE IF NOT EXISTS inquiries (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NULL,
  phone VARCHAR(32) NULL,
  subject VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  user_id INT UNSIGNED NULL,
  status ENUM('new', 'read', 'replied') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_inquiries_user (user_id),
  KEY idx_inquiries_status (status),
  CONSTRAINT fk_inquiries_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`;

// Creates the tables on first use, mirroring how Mongoose created its
// collections automatically. Runs once per process; also available as a
// file in sql/schema.sql for manual import (phpMyAdmin).
export async function ensureSchema() {
  if (!cache.schemaPromise) {
    cache.schemaPromise = (async () => {
      const pool = getPool();
      await pool.query(CREATE_USERS);
      const [tables] = await pool.query(
        `SELECT table_name AS tableName
           FROM information_schema.tables
          WHERE table_schema = DATABASE()
            AND table_name IN ('inquiries', 'contact_messages')`
      );
      let hasInquiries = tables.some((table) => table.tableName === "inquiries");
      let hasLegacyContactMessages = tables.some(
        (table) => table.tableName === "contact_messages"
      );

      if (hasLegacyContactMessages && !hasInquiries) {
        try {
          await pool.query("RENAME TABLE contact_messages TO inquiries");
          hasInquiries = true;
          hasLegacyContactMessages = false;
        } catch (err) {
          if (err.code !== "ER_NO_SUCH_TABLE") throw err;
          const [currentTables] = await pool.query(
            `SELECT table_name AS tableName
               FROM information_schema.tables
              WHERE table_schema = DATABASE()
                AND table_name IN ('inquiries', 'contact_messages')`
          );
          hasInquiries = currentTables.some(
            (table) => table.tableName === "inquiries"
          );
          hasLegacyContactMessages = currentTables.some(
            (table) => table.tableName === "contact_messages"
          );
          if (!hasInquiries || hasLegacyContactMessages) throw err;
        }
      }

      if (!hasInquiries) {
        await pool.query(CREATE_INQUIRIES);
        hasInquiries = true;
      }

      const [columns] = await pool.query("SHOW COLUMNS FROM inquiries");
      if (!columns.some((column) => column.Field === "phone")) {
        try {
          await pool.query(
            "ALTER TABLE inquiries ADD COLUMN phone VARCHAR(32) NULL AFTER email"
          );
        } catch (err) {
          if (err.code !== "ER_DUP_FIELDNAME") throw err;
        }
      }
      await pool.query(
        "ALTER TABLE inquiries MODIFY COLUMN email VARCHAR(254) NULL"
      );

      if (hasLegacyContactMessages) {
        const [legacyColumns] = await pool.query(
          "SHOW COLUMNS FROM contact_messages"
        );
        const legacyPhone = legacyColumns.some(
          (column) => column.Field === "phone"
        )
          ? "legacy.phone"
          : "NULL";
        await pool.query(
          `INSERT INTO inquiries
             (name, email, phone, subject, message, user_id, status, created_at, updated_at)
           SELECT legacy.name, legacy.email, ${legacyPhone}, legacy.subject,
                  legacy.message, legacy.user_id, legacy.status,
                  legacy.created_at, legacy.updated_at
             FROM contact_messages AS legacy
            WHERE NOT EXISTS (
              SELECT 1
                FROM inquiries AS existing_inquiry
               WHERE existing_inquiry.name <=> legacy.name
                 AND existing_inquiry.email <=> legacy.email
                 AND existing_inquiry.phone <=> ${legacyPhone}
                 AND existing_inquiry.subject <=> legacy.subject
                 AND existing_inquiry.message <=> legacy.message
                 AND existing_inquiry.user_id <=> legacy.user_id
                 AND existing_inquiry.status <=> legacy.status
                 AND existing_inquiry.created_at <=> legacy.created_at
                 AND existing_inquiry.updated_at <=> legacy.updated_at
            )`
        );
        await pool.query("DROP TABLE IF EXISTS contact_messages");
      }
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
