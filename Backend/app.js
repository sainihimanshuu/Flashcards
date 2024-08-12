import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "https://flashcards-frontend-x3d9.onrender.com",
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import cardRouter from "./src/Routes/card.routes.js";

app.use("/api/v1/card", cardRouter);

export default app;
