const database = require('../config/dbConn')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {

    const users = await database.query('SELECT id, username, role, is_active FROM users;')

    // If no users 
    if (users.rowCount === 0) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users.rows)
}

// @desc Get all users
// @route GET /users/:id
// @access Private
const getUserById = async (req, res) => {

    const { id } = req.params;

    const user = await database.query('SELECT * FROM users WHERE id=$1', [id])

    // If no users 
    if (user.rowCount === 0) {
        return res.status(400).json({ message: 'User not found' })
    }

    res.json(user.rows)
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
    const { username, password, role } = req.body

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await database.query('SELECT * FROM users WHERE username=$1', [username])

    if (duplicate.rowCount !== 0) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    // const userObject = (!Array.isArray(role) || !role.length)
    //     ? { username, "password": hashedPwd }
    //     : { username, "password": hashedPwd, role }

    // console.log(userObject)

    // Create and store new user 
    const user = await database.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, hashedPwd, role])

    console.log(user)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
    const { id, username, role, is_active, password } = req.body;

    // Confirm data 
    if (!id || !username || !role || typeof is_active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' });
    }

    // Does the user exist to update?
    const user = await database.query('SELECT * FROM users WHERE id=$1', [id]);

    if (user.rowCount === 0) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Check for duplicate 
    const duplicate = await database.query('SELECT * FROM users WHERE username=$1', [username]);

    // Allow updates to the original user 
    if (duplicate.rowCount !== 0 && duplicate.rows[0].id !== id) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    let updatedUser;

    if (password) {
        // Hash password 
        const updatedHashedPwd = await bcrypt.hash(password, 10); // salt rounds 
        updatedUser = await database.query('UPDATE users SET username=$1, password=$2, role=$3, is_active=$4 WHERE id=$5 RETURNING *', [username, updatedHashedPwd, role, is_active, id]);
    } else {
        updatedUser = await database.query('UPDATE users SET username=$1, role=$2, is_active=$3 WHERE id=$4 RETURNING *', [username, role, is_active, id]);
    }

    res.json({ message: `${updatedUser.rows[0].username} updated` });
};


// @desc Delete a user
// @route DELETE /users/:id
// @access Private
const deleteUser = async (req, res) => {
    const { id } = req.params;

    // Log the received id for debugging
    console.log('Received id:', id);

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    // Does the user exist to delete?
    const user = await database.query('SELECT * FROM users WHERE id=$1;', [id]);

    console.log('User query result:', user.rows);

    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'User not found' });
    }

    const result = await database.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);

    const reply = `Username ${result.rows[0].username} with ID ${result.rows[0].id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
};
