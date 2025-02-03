const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

// File JSON untuk menyimpan data
const PRODUCTS_FILE = 'products.json';
const USERS_FILE = 'users.json';

// Fungsi untuk membaca data dari file JSON
function readData(file) {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
}

// Fungsi untuk menulis data ke file JSON
function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Middleware untuk validasi input produk
function validateProduct(req, res, next) {
    const { name, price, photo_url } = req.body;
    if (!name || !price || !photo_url) {
        return res.status(400).json({ error: 'Name, price, and photo_url are required' });
    }
    next();
}

// Middleware untuk validasi input user
function validateUser(req, res, next) {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
    }
    next();
}

// CRUD untuk Produk
// Get all products
app.get('/products', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    res.json(products);
});

// Get product by ID
app.get('/products/:id', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// Create a new product
app.post('/products', validateProduct, (req, res) => {
    const products = readData(PRODUCTS_FILE);

    // Cari id terakhir
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;

    // Buat produk baru dengan id terakhir + 1
    const newProduct = {
        id: lastId + 1, // Gunakan id terakhir + 1
        ...req.body
    };

    products.push(newProduct);
    writeData(PRODUCTS_FILE, products);
    res.status(201).json(newProduct);
});

// Update a product
app.put('/products/:id', validateProduct, (req, res) => {
    const products = readData(PRODUCTS_FILE);
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products[index] = { ...products[index], ...req.body };
    writeData(PRODUCTS_FILE, products);
    res.json(products[index]);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    const filteredProducts = products.filter(p => p.id !== parseInt(req.params.id));
    if (filteredProducts.length === products.length) {
        return res.status(404).json({ error: 'Product not found' });
    }
    writeData(PRODUCTS_FILE, filteredProducts);
    res.status(204).send();
});

// CRUD untuk User
// Get all users
app.get('/users', (req, res) => {
    const users = readData(USERS_FILE);
    res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
    const users = readData(USERS_FILE);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// Create a new user
app.post('/users', validateUser, async (req, res) => {
    const users = readData(USERS_FILE);

    // Cari id terakhir
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Buat user baru dengan id terakhir + 1
    const newUser = {
        id: lastId + 1, // Gunakan id terakhir + 1
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    };

    users.push(newUser);
    writeData(USERS_FILE, users);
    res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', validateUser, async (req, res) => {
    const users = readData(USERS_FILE);
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'User  not found' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users[index] = { ...users[index], ...req.body, password: hashedPassword };
    writeData(USERS_FILE, users);
    res.json(users[index]);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const users = readData(USERS_FILE);
    const filteredUsers = users.filter(u => u.id !== parseInt(req.params.id));
    if (filteredUsers.length === users.length) {
        return res.status(404).json({ error: 'User  not found' });
    }
    writeData(USERS_FILE, filteredUsers);
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('full code : https://github.com/LALA09-erha/Express-RestAPI-Test');
});

// Menjalankan server
const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // check apakah file users.json ada, jika tidak, buat file baru
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, '[]');
    }

    // check apakah file products.json ada, jika tidak, buat file baru
    if (!fs.existsSync(PRODUCTS_FILE)) {
        fs.writeFileSync(PRODUCTS_FILE, '[]');
    }


});
