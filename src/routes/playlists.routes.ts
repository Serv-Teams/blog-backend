import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../config/db.js";

const router = express.Router();

/* Create Playlist */
router.post("/", async (req, res) => {
    const { userId, playlistName } = req.body;
    const { playlists } = await collections();

    const playlist = await playlists.insertOne({
        userId: new ObjectId(userId),
        playlistName,
        videos: [],
        createdAt: new Date()
    });

    res.json(playlist);
});

/* Add Video to Playlist */
router.post("/:id/videos", async (req, res) => {
    const { videoId } = req.body;
    const { playlists } = await collections();

    await playlists.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $addToSet: { videos: new ObjectId(videoId) } }
    );

    res.json({ success: true });
});

export default router;
