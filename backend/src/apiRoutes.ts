import express from "express";

const router = express.Router();

router.get("/message", (_req, res) => {
    res.json({
        message: "Hello from API 🎯",
    });
});

export default router;
