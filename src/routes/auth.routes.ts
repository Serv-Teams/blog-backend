import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { generateCSRFToken } from "../utils/csrf.js";
import { csrfProtection } from "../middleware/csrf.middleware.js";

const csrfToken = generateCSRFToken();

const router = Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const user = req.user as any;


        const token = jwt.sign(
            { id: user.googleId, email: user.email },
            env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .cookie("csrf_token", csrfToken, {
                httpOnly: false, // WAJIB
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            })
            .redirect(`${env.FRONTEND_URL}/dashboard`);
    }
);

router.post('/logout', csrfProtection, (_req, res) => {
    res
        .clearCookie("token")
        .clearCookie("csrf_token")
        .sendStatus(200);
});


export default router;