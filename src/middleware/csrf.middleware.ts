import type { Request, Response, NextFunction } from "express";

export function csrfProtection(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const csrfCookie = req.cookies?.csrf_token;
    const csrfHeader = req.headers["x-csrf-token"];

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
        return res.status(403).json({ message: "CSRF token invalid" });
    }

    next();
}
