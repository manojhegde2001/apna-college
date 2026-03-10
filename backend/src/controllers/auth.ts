import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getCollection } from '../mongoClient.js';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const users = await getCollection('User');
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await users.insertOne({
            name,
            email,
            password: hashedPassword,
            completedProblems: [],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const token = jwt.sign({ userId: result.insertedId.toString() }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: result.insertedId, name, email } });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const users = await getCollection('User');
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, completedProblems: user.completedProblems || [] } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};

export const getProfile = async (req: any, res: Response) => {
    try {
        const users = await getCollection('User');
        const user = await users.findOne(
            { _id: new ObjectId(req.user.userId) }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { password, ...userWithoutPassword } = user;
        res.json({ ...userWithoutPassword, id: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Fetch profile failed', error });
    }
};
