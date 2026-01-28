import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { auth, type AuthRequest } from '../middleware/auth.middleware.js';
import { db } from '../config/mongodb.js';

const router = Router();
const channels = db().collection('channels');
const subscriptions = db().collection('subscriptions');

// Subscribe
router.post('/:id', auth, async (req: AuthRequest, res) => {
    const myChannel = await channels.findOne({ userId: req.user.id });
    if (!myChannel) return res.status(400).json({ message: 'Create channel first' });

    const targetId = new ObjectId(req.params.id as string);
    if (myChannel._id.equals(targetId)) return res.sendStatus(400);

    await subscriptions.insertOne({
        subscriberChannelId: myChannel._id,
        targetChannelId: targetId,
        createdAt: new Date(),
    });

    await channels.updateOne({ _id: targetId }, { $inc: { subscribersCount: 1 } });
    res.sendStatus(200);
});

// Unsubscribe
router.delete('/:id', auth, async (req: AuthRequest, res) => {
    const myChannel = await channels.findOne({ userId: req.user.id });
    if (!myChannel) return res.sendStatus(400);

    const targetId = new ObjectId(req.params.id as string);

    await subscriptions.deleteOne({
        subscriberChannelId: myChannel._id,
        targetChannelId: targetId,
    });

    await channels.updateOne({ _id: targetId }, { $inc: { subscribersCount: -1 } });
    res.sendStatus(200);
});

// Is subscribed
router.get('/:id/status', auth, async (req: AuthRequest, res) => {
    const myChannel = await channels.findOne({ userId: req.user.id });
    if (!myChannel) return res.json({ subscribed: false });

    const sub = await subscriptions.findOne({
        subscriberChannelId: myChannel._id,
        targetChannelId: new ObjectId(req.params.id as string),
    });

    res.json({ subscribed: Boolean(sub) });
});

export default router;