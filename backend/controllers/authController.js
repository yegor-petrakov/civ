const database = require('../config/dbConn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    const foundUser = await database.query('SELECT * FROM users WHERE username=$1', [username]);

    if (foundUser.rowCount === 0) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!foundUser.rows[0].is_active) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, foundUser.rows[0].password);

    if (!match) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const accessToken = jwt.sign(
        {
            username: foundUser.rows[0].username,
            role: foundUser.rows[0].role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
        { username: foundUser.rows[0].username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const role = foundUser.rows[0].role;

    res.json({ username, role, accessToken, refreshToken });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const foundUser = await database.query('SELECT * FROM users WHERE username=$1', [decoded.username]);

        if (foundUser.rowCount === 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const username = foundUser.rows[0].username;
        const role = foundUser.rows[0].role;

        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.rows[0].username,
                    role: foundUser.rows[0].role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ username, role, accessToken });
    });
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie cleared' });
};

module.exports = {
    login,
    refresh,
    logout
};
