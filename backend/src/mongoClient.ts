import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE_URL || "mongodb://localhost:27017/dsa-sheet";
const client = new MongoClient(url);

let db: any = null;

export const connectDB = async () => {
    if (db) return db;
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB");
    return db;
};

export const getCollection = async (name: string) => {
    const database = await connectDB();
    return database.collection(name);
};

export default { connectDB, getCollection };
