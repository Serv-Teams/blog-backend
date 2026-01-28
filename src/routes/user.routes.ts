// src/routes/user.routes.ts
import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";


const router = Router();


router.get("/me", auth, (req, res) => {
    res.json(req.user);
});


export default router;