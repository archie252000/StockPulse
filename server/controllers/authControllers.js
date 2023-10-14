const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    User,
    UserNotificaionTokens
} = require('../models')

const jwtSecretKey = process.env.JWT_SECRET_KEY;

// utils
const generateToken = (userId) => {
    return jwt.sign({ userId }, jwtSecretKey, { expiresIn: '1h' });
}

const hashPassword = async(password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

const comparePassword = async(password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
}

// DB interaction utils

const addUser = async(username, password) => {
    return await User.create({
        username,
        password
    })
}

const checkUsername = async(username) => {
    return await User.findOne({
        where: { username }
    })
}


const addNotificationToken = async(UserId, notificationToken) => {
    await UserNotificaionTokens.create({
        UserId,
        notificationToken
    })
}

// Controller for user registeration
const registerUser = async(req, res) => {

    const { username, password } = req.body;

    try {

        const existingUser = await checkUsername(username);

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const passwordHash = await hashPassword(password);

        const newUser = await addUser(username, passwordHash);

        const token = generateToken(newUser.id);

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


}

// Controller for user login
const loginUser = async(req, res) => {

    const { username, password } = req.body;

    try {

        const user = await checkUsername(username);

        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.id);

        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

// Stores User's notification token

const notificationToken = async(req, res) => {
    const { notificationToken } = req.body;

    try {
        addNotificationToken(req.userId, notificationToken);
        res.status(200).json({ message: "token successfully added" });
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
}

module.exports = {
    registerUser,
    loginUser,
    notificationToken
};