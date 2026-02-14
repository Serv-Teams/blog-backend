import { Db, MongoClient } from "mongodb";
import { env } from "./env.js";

const uri = env.MONGODB_URI;
const client = new MongoClient(uri);

let db: Db;

export async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db(env.DB_NAME);
        console.log("MongoDB connected");
    }
    return db;
}

export async function collections() {
    const db = await connectDB();
    return {
        users: db.collection("users"),
        channels: db.collection("channels"),
        videos: db.collection("videos"),
        videoLikes: db.collection("videoLikes"),
        videoWatches: db.collection("videoWatches"),
        playlists: db.collection("playlists")
    };
}
