import { ObjectId } from 'mongodb';

export interface Channel {
    _id?: ObjectId
    userId: string // googleId
    handle: string // @namachannel
    name: string // Nama channel
    avatar: string
    banner?: string
    description?: string
    subscribersCount: number
    createdAt: Date
}