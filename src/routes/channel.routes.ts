import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { auth, type AuthRequest } from '../middleware/auth.middleware.js';
import { db } from '../config/mongodb.js';
import type { Channel } from '../types/channel.js';

const router = Router();
const channels = db().collection<Channel>('channels');

// Create channel (explicit)
router.post('/', auth, async (req: AuthRequest, res) => {
    const exists = await channels.findOne({ userId: req.user.id });
    if (exists) return res.status(400).json({ message: 'Channel already exists' });

    const channel: Channel = {
        userId: req.user.id,
        handle: req.body.handle.startsWith('@') ? req.body.handle : '@' + req.body.handle,
        name: req.body.name,
        avatar: req.user.avatar,
        subscribersCount: 0,
        createdAt: new Date(),
    };

    await channels.insertOne(channel);
    res.status(201).json(channel);
});

// Get my channel
router.get('/me', auth, async (req: AuthRequest, res) => {
    const channel = await channels.findOne({ userId: req.user.id });
    res.json(channel);
});

// Public channel
router.get('/:handle', async (req, res) => {
    const handle = req.params.handle.startsWith('@')
        ? req.params.handle
        : '@' + req.params.handle;

    const channel = await channels.findOne({ handle });
    if (!channel) return res.sendStatus(404);
    res.json(channel);
});

export default router;