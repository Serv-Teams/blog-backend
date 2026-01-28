import { ObjectId } from 'mongodb';


export interface User {
    _id?: ObjectId; // <-- Fix: use ObjectId or ObjectId | undefined
    googleId: string;
    name: string;
    email: string;
    avatar: string;
    provider: "google";
    createdAt: Date;
}