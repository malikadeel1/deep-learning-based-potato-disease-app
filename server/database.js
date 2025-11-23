import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path (needed because we are using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define where the database file will be stored
const dbPath = path.resolve(__dirname, 'users.db');

// Initialize the SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create the 'users' table if it doesn't already exist
        // id: Unique identifier for each user (auto-increments: 1, 2, 3...)
        // name: User's full name
        // email: User's email (must be UNIQUE, no duplicates allowed)
        // password: The HASHED password (not plain text)
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table: ' + err.message);
            }
        });
    }
});

export default db;
