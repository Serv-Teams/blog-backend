import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "./mongodb.js";
import { env } from "./env.js";
import type { User } from "../types/user.js";

const users = db().collection<User>("users");

passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) return done(new Error("No email from Google"));

                let user = await users.findOne({ googleId: profile.id });

                if (!user) {
                    const newUser: User = {
                        googleId: profile.id,
                        name: profile.displayName,
                        email,
                        avatar: profile.photos?.[0]?.value || "",
                        provider: "google",
                        createdAt: new Date(),
                    };
                    const insertResult = await users.insertOne(newUser);
                    user = await users.findOne({ _id: insertResult.insertedId });
                }

                if (!user) {
                    return done(null, false);
                }
                done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);

export default passport;