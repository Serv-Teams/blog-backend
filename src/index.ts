import { app } from "./app.js";
import { connectDB } from "./config/mongodb.js";
import "./config/passport.js";
import { env } from "./config/env.js";
import { initIndexes } from "./config/db.init.js";

await connectDB();
await initIndexes();

app.listen(Number(env.PORT), () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});