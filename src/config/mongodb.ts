import { MongoClient } from "mongodb";
import { env } from "./env.js";

export const client = new MongoClient(env.MONGODB_URI);

export async function connectDB() {
    await client.connect();
    console.log("MongoDB connected");
}

export const db = () => client.db("blog");
