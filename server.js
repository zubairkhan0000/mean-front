const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 9002;

app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'ecom_user',
    password: 'zubbukhan1824',
    database: 'ecommerce'
});

db.connect(err => {
    if (err) {
        console.error('❌ MySQL Connection Failed:', err);
        process.exit(1);
    }
    console.log('✅ MySQL Connected...');
});

// 🟢 Register User (POST /register)
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            console.error('❌ Database Error:', err);
            return res.status(500).json({ error: '❌ Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: '❌ Username already exists' });
        }

        // If user doesn't exist, insert into DB
        const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertUserQuery, [username, password], (err, result) => {
            if (err) {
                console.error('❌ Error inserting user:', err);
                return res.status(500).json({ error: '❌ Error registering user' });
            }
            res.json({ message: '✅ User registered successfully' });
        });
    });
});

// 🟢 Login User (POST /login)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const loginQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(loginQuery, [username, password], (err, results) => {
        if (err) {
            console.error('❌ Database Error:', err);
            return res.status(500).json({ error: '❌ Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: '❌ Invalid username or password' });
        }

        res.json({ message: '✅ Login successful', user: results[0] });
    });
});

// 🟢 Get Products (GET /products)
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';

    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error fetching products:', err);
            return res.status(500).json({ error: '❌ Error fetching products' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
