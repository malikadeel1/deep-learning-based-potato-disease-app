import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './database.js';

// Initialize the Express application
const app = express();
const PORT = 3000; // The port where our backend server will run
const SECRET_KEY = 'your-secret-key-change-this-in-production'; // Secret key used to sign JWT tokens (keep this safe!)

// Middleware Setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (allows frontend at localhost:5173 to talk to backend at localhost:3000)
app.use(express.json()); // Parse incoming JSON payloads from requests (so we can access req.body)

// ==========================================
// REGISTER ENDPOINT
// ==========================================
// This route handles user sign-up.
// It receives name, email, and password from the frontend.
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation: Ensure all fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    // Hash the password before saving it to the database.
    // NEVER store passwords in plain text! '8' is the salt rounds (complexity).
    const hashedPassword = bcrypt.hashSync(password, 8);

    // SQL query to insert a new user
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const params = [name, email, hashedPassword];

    // Execute the SQL query
    db.run(sql, params, function (err) {
        if (err) {
            // Check if the error is due to a duplicate email
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            // Handle other database errors
            return res.status(500).json({ error: err.message });
        }

        // If successful, create a JWT token for the user so they are logged in immediately
        const token = jwt.sign({ id: this.lastID }, SECRET_KEY, { expiresIn: '24h' });

        // Send back success response with user info and token
        res.json({
            message: 'User registered successfully',
            user: { id: this.lastID, name, email },
            token
        });
    });
});

// ==========================================
// LOGIN ENDPOINT
// ==========================================
// This route handles user sign-in.
// It verifies the email and password against the database.
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    // SQL query to find the user by email
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // If no user found with that email
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If password matches, create a new token
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });

        // Send back success response
        res.json({
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email },
            token
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
