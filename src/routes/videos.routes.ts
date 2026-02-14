import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { channelId, title, description, duration } = req.body;
    const { videos } = await collections();

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");

    const video = await videos.insertOne({
        channelId: new ObjectId(channelId),
        title,
        slug,
        description,
        duration,
        uploadDate: new Date(),
        comments: [],
        likesCount: 0,
        viewsCount: 0
    });

    res.json({ insertedId: video.insertedId, slug });
});


router.get("/:slug", async (req, res) => {
    const { videos } = await collections();

    const video = await videos.findOne({
        slug: req.params.slug
    });

    if (!video) return res.status(404).json({ message: "Not found" });

    res.json(video);
});


export default router;
