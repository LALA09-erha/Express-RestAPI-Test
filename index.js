const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require("cors");
require("dotenv").config();
const { products, getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./src/products');
const { users, getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('./src/users');
const transporter = require('./src/email');
const app = express();
app.use(bodyParser.json());
app.use(cors());


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
app.get('/products', (req, res) => {
    res.json(getAllProducts());
});

app.get('/products/:id', (req, res) => {
    const product = getProductById(parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

app.post('/products', validateProduct, (req, res) => {
    const newProduct = createProduct(req.body);
    res.status(201).json(newProduct);
});

app.put('/products/:id', validateProduct, (req, res) => {
    const updatedProduct = updateProduct(parseInt(req.params.id), req.body);
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
});

app.delete('/products/:id', (req, res) => {
    const isDeleted = deleteProduct(parseInt(req.params.id));
    if (!isDeleted) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
});

// CRUD untuk User
app.get('/users', (req, res) => {
    res.json(getAllUsers());
});

app.get('/users/:id', (req, res) => {
    const user = getUserById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

app.post('/users', validateUser, async (req, res) => {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
});

app.put('/users/:id', validateUser, async (req, res) => {
    const updatedUser = await updateUser(parseInt(req.params.id), req.body);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const isDeleted = deleteUser(parseInt(req.params.id));
    if (!isDeleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
});

// send email
app.post('/send-email', async (req, res) => {
    const { email, subject, message, name } = req.body;
    try {
        await transporter.sendMail({
            from: `"Portfolio Mailer" <${process.env.EMAIL_USER}>`,
            to: "lalangxixi@gmail.com",
            subject: subject,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
              <h2 style="color: #333; text-align: center;">📩 New Message from Portfolio</h2>
              <hr style="border: none; height: 1px; background-color: #ddd;">
              <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${name}</p>
              <p style="font-size: 16px; color: #555;"><strong>Message:</strong> ${message}</p>
              <p style="font-size: 16px; color: #555;"><strong>From:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
              <hr style="border: none; height: 1px; background-color: #ddd;">
              <p style="font-size: 14px; text-align: center; color: #777;">
                Best Regards, <br> 
                <strong style="color: #333;">Portfolio Mailer</strong>
              </p>
            </div>
          `,
            replyTo: email
        });
        res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
}
);

app.get('/', (req, res) => {
    res.send('full code : https://github.com/LALA09-erha/Express-RestAPI-Test');
});

// Menjalankan server
const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});