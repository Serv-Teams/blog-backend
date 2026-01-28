import { db } from './mongodb.js';

export async function initIndexes() {
    const channels = db().collection('channels');
    const subscriptions = db().collection('subscriptions');

    await channels.createIndex(
        { handle: 1 },
        { unique: true }
    );

    await subscriptions.createIndex(
        { subscriberChannelId: 1, targetChannelId: 1 },
        { unique: true }
    );

    console.log('✅ MongoDB indexes ensured');
}
