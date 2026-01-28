import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthRequest extends Request {
    user?: any;
}

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    try {
        req.user = jwt.verify(token, env.JWT_SECRET);
        next();
    } catch {
        res.sendStatus(403);
    }
}