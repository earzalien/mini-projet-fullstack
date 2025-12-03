import cors from "cors";
import express from "express";
import apiRoutes from "./apiRoutes";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (_req, res) => {
    res.send("Hello from backend 🎉");
});

app.listen(PORT, () => {
    // Server started
});
