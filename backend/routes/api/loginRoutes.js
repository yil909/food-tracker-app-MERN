
import express from "express";
import { getUserByName, saveUser, updateUser, getUserById } from "../../modules/login-dao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const jwtSecretKey = '2024119157'; // Use environment variable for JWT secret key

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByName(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashpw);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.userid }, jwtSecretKey, { expiresIn: '240h' });
        return res.json({ token, message: 'Login succeeded!', isAdmin: user.is_admin });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await getUserByName(username);
        if (existingUser) {
            return res.status(401).json({ error: 'The username already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = { ...req.body, hashpw: hashedPassword };
        await saveUser(newUser);

        return res.json({ message: 'Register succeeded!' });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Password reset
router.post('/reset', async (req, res) => {
    const { username, newPassword, doubleCheck } = req.body;
    try {
        if (!username || !newPassword || !doubleCheck) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const user = await getUserByName(username);
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        const isOldPasswordValid = await bcrypt.compare(doubleCheck, user.hashpw);
        if (!isOldPasswordValid) {
            return res.status(401).json({ error: 'Invalid original password' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.hashpw = hashedPassword;
        await updateUser(user);

        return res.json({ message: 'Reset succeeded!' });
    } catch (error) {
        console.error("Error in password reset:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// JWT Middleware
export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Not Logged In' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Login Failure' });
    }
};

// Get User Data
router.get('/getUser', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }
        // Exclude sensitive information
        const { hashpw, ...userData } = user;
        return res.json({ message: 'Logged in', user: userData });
    } catch (error) {
        console.error("Error in getting user data:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
