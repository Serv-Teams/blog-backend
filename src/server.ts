import express from "express";
import cors from "cors";
import { env } from "./config/env.js";

import videosRoutes from "./routes/videos.routes.js";
import playlistsRoutes from "./routes/playlists.routes.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/videos", videosRoutes);
app.use("/api/playlists", playlistsRoutes);

app.listen(env.PORT, () => {
    console.log(`API running on http://localhost:${env.PORT}`);
});
