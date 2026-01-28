import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import channelRoutes from "./routes/channel.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import cors from "cors";
import { env } from "./config/env.js";

export const app = express();

// URUTAN PERTAMA
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// URUTAN KEDUA
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


// URUTAN KETIGA
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use('/channels', channelRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.get("/health", (_, res) => res.json({ status: "ok" }));