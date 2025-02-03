const bcrypt = require('bcryptjs');
let users = [];

function getAllUsers() {
    return users;
}

function getUserById(id) {
    return users.find(u => u.id === id);
}

async function createUser(user) {
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { id: lastId + 1, ...user, password: hashedPassword };
    users.push(newUser);
    return newUser;
}

async function updateUser(id, updatedUser) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    const hashedPassword = await bcrypt.hash(updatedUser.password, 10);
    users[index] = { ...users[index], ...updatedUser, password: hashedPassword };
    return users[index];
}

function deleteUser(id) {
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    return users.length !== initialLength;
}

module.exports = {
    users,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};